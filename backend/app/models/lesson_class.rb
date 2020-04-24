class LessonClass < ApplicationRecord
  has_many :lessons, dependent: :destroy

  validations :name, presence: true
  validations :lesson_rule, presence: true
end
