class LessonClass < ApplicationRecord
  has_many :lessons, dependent: :destroy
  has_many :lesson_rules, dependent: :destroy

  validates :name, presence: true
  validates :location, presence: true
end
