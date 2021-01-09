class Lesson < ApplicationRecord
  class AlreadyJoinedError < StandardError; end
  class CantJoinError < StandardError; end
  class CantJoinLessonClassError < StandardError; end
  class UserLimitCountError < StandardError; end
  class NotJoinedError < StandardError; end
  class CantLeaveError < StandardError; end

  belongs_to :lesson_class
  has_many :user_lessons, dependent: :destroy
  has_many :users, through: :user_lessons

  validates :start_at, presence: true, uniqueness: { scope: [:lesson_class_id] }
  validates :end_at, presence: true, uniqueness: { scope: [:lesson_class_id] }
  validates :location, presence: true
  validates :name, presence: true

  def class_name
    if lesson_class
      lesson_class.name
    end
  end

  def class_description
    if lesson_class
      lesson_class.description
    end
  end

  def class_color
    if lesson_class
      lesson_class.color
    end
  end

  def lesson_class_id
    if lesson_class
      lesson_class.id
    end
  end

  def joined?(user)
    users.include? user
  end

  def join(user, admin=false)
    # 参加済みのレッスンへ再度参加した場合
    if joined?(user) then raise AlreadyJoinedError end
    # ユーザが参加できないレッスンの場合(現在のプランでは参加できない)
    if !user.user_lesson_classes.include?(self.lesson_class) then raise CantJoinLessonClassError end
    # レッスンに参加できる人数を超えている場合
    if self.users.count >= self.user_limit_count then raise UserLimitCountError end

    if !admin
      # 参加しようとしているレッスンの開始時刻が過去もしくは当日である場合(管理者の操作の場合は可能)
      if Time.current > start_at.beginning_of_day then raise CantJoinError end
    end

    users << user
  end

  def leave(user, admin=false)
    # 参加取り消し済みのレッスンへ再度参加取り消しをした場合
    unless joined?(user) then raise NotJoinedError end

    if !admin
      # 参加取り消ししようとしているレッスンの開始時刻が過去もしくは当日である場合(管理者の操作の場合は可能)
      if Time.current > start_at.beginning_of_day then raise CantLeaveError end
    end

    user_lessons.find_by(user_id: user.id).destroy
  end

  def leave_all
    ul = user_lessons.where(lesson_id: id)
    if ul
      ul.destroy_all
    end
  end

  # week(週) と dotw(曜日) から該当する来月の日を求める
  def self.next_month_date_from_week_and_dotw(week, dotw)
    first_day = Date.current.beginning_of_month.next_month

    first_week = 7 - first_day.wday
    # 日曜始まりにするためにwday+1にする
    day = first_week + (7 * (week - 2)) + dotw + 1

    # 月の最後の日よりも大きい or 1日より小さい場合は false
    return false if first_day.end_of_month < day || day < 1
    Date.new(first_day.year, first_day.month, day)
  end


  # NOTE: Seed 用メソッド
  # week(週) と dotw(曜日) から該当する今月の日を求める
  def self.current_month_date_from_week_and_dotw(week, dotw)
    first_day = Date.current.beginning_of_month

    first_week = 7 - first_day.wday
    # 日曜始まりにするためにwday+1にする
    day = first_week + (7 * (week - 2)) + dotw + 1

    # 月の最後の日よりも大きい or 1日より小さい場合は false
    return false if first_day.end_of_month < day || day < 1
    Date.new(first_day.year, first_day.month, day)
  end
end
