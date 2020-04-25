class LessonClass < ApplicationRecord
  has_many :lessons, dependent: :destroy

  validates :name, presence: true
  validates :lesson_rule, presence: true
end
