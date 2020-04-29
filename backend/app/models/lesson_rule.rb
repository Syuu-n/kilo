class LessonRule < ApplicationRecord
  belongs_to :lesson_class

  validates :dotw, presence: true
  validates :start_at, presence: true
  validates :end_at, presence: true
end
