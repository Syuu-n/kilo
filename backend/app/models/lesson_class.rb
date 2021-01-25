class LessonClass < ApplicationRecord
  has_many :lessons, dependent: :destroy
  has_many :lesson_rules, dependent: :destroy

  has_many :plan_lesson_classes, dependent: :destroy
  has_many :plans, through: :plan_lesson_classes

  validates :name, presence: true
  validates :location, presence: true
end
