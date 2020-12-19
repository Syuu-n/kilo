class PlanLessonClass < ApplicationRecord
  belongs_to :plan
  belongs_to :lesson_class

  validates :plan_id, uniqueness: { scope: :lesson_class_id }
end
