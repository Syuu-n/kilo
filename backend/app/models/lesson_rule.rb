class LessonRule < ApplicationRecord
  belongs_to :lesson_class

  validates :dotw, presence: true
  validates :start_at, presence: true, uniqueness: { scope: [:dotw, :lesson_class_id] }
  validates :end_at, presence: true, uniqueness: { scope: [:dotw, :lesson_class_id] }
end
