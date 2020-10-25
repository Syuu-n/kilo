class Lesson < ApplicationRecord
  belongs_to :lesson_class
  has_many :user_lessons, dependent: :destroy
  has_many :users, through: :user_lessons

  validates :start_at, presence: true
  validates :end_at, presence: true

  def class_name
    if lesson_class
      lesson_class.name
    end
  end

  def class_memo
    if lesson_class
      lesson_class.description
    end
  end

  def color
    if lesson_class
      lesson_class.color
    end
  end

  def joined?(user)
    users.include? user
  end

  def join(user)
    users << user
  end

  def leave(user)
    user_lessons.find_by(user_id: user.id).destroy
  end
end
