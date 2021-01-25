class Lesson < ApplicationRecord
  class AlreadyJoinedError < StandardError; end
  class CantJoinError < StandardError; end
  class CantJoinLessonClassError < StandardError; end
  class UserLimitCountError < StandardError; end
  class CantJoinOrLeaveTrialUserError < StandardError; end
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

  def remaining_user_count
    if user_limit_count
      user_limit_count - users.count
    else
      0
    end
  end

  def joined?(user)
    users.include? user
  end

  def join(user, admin=false)
    # 体験中のユーザの場合かつ参加しているレッスンがすでにある場合
    if user.is_trial? && user.lessons.count > 0 then raise CantJoinOrLeaveTrialUserError end
    # 参加済みのレッスンへ再度参加した場合
    if joined?(user) then raise AlreadyJoinedError end
    # ユーザが参加できないレッスンの場合(現在のプランでは参加できない)
    if !user.user_lesson_classes.include?(self.lesson_class) then raise CantJoinLessonClassError end
    # レッスンに参加できる人数を超えている場合
    if remaining_user_count <= 0 then raise UserLimitCountError end

    if !admin
      # 参加しようとしているレッスンの開始時刻が過去もしくは当日である場合(管理者の操作の場合は可能)
      if Time.current > start_at.beginning_of_day then raise CantJoinError end
    end

    users << user
  end

  def leave(user, admin=false)
    # 体験中のユーザの場合かつ参加しているレッスンがすでにある場合
    if user.is_trial? && user.lessons.count > 0 then raise CantJoinOrLeaveTrialUserError end
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

  # 引数で渡したレッスンの配列へ参加可能なユーザを全て参加させる
  # 子供コース自動参加用メソッド
  def self.join_lessons(lessons)
    plan_lessons_classes = PlanLessonClass.all
    user_plans = UserPlan.all
    trial_plan = Plan.trial_plan
    normal_role = Role.normal
    lessons.each do |lesson|
      # レッスンのクラスへ参加できるコース一覧を取得
      filtered_plan_lesson_classes = plan_lessons_classes.filter do |plan_lessons_class|
        plan_lessons_class.lesson_class_id == lesson.lesson_class_id
      end
      raw_plans = filtered_plan_lesson_classes.map{|fplc| fplc.plan}
      raw_plans.uniq!
      # 体験コースを除外する
      plans = raw_plans.reject{|plan| plan == trial_plan}
      # 該当するコースを持っているユーザ一覧を取得
      raw_users = []
      plans.each do |plan|
        selected_user_plans = user_plans.filter{|user_plan| user_plan.plan_id == plan.id}
        raw_users << selected_user_plans.map{|selected_user_plan| selected_user_plan.user}
      end
      formatted_users = raw_users.flatten.uniq
      # 会員のユーザのみを取得
      users = formatted_users.filter{|raw_user| raw_user.role == normal_role}
      # 取得したユーザ一覧を該当するレッスンへ参加させる
      users.each do |user|
        if lesson.remaining_user_count > 0
          lesson.join(user)
        end
      end
    end
  end
end
