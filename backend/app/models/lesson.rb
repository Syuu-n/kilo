class Lesson < ApplicationRecord
  belongs_to :lesson_class
  has_many :user_lessons, dependent: :destroy
  has_many :users, through: :user_lessons

  validates :start_at, presence: true
  validates :end_at, presence: true

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
