class Lesson < ApplicationRecord
  belongs_to :lesson_class

  validates :start_at, presence: true
  validates :end_at, presence: true
end
