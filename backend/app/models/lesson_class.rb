class LessonClass < ApplicationRecord
  has_many :lessons, dependent: :destroy
  has_many :lesson_rules, dependent: :destroy
  accepts_nested_attributes_for :lesson_rules

  validates :name, presence: true
end
