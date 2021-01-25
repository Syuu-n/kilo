class Plan < ApplicationRecord
  has_many :user_plans, dependent: :destroy
  has_many :users, through: :user_plans

  has_many :plan_lesson_classes, dependent: :destroy
  has_many :lesson_classes, through: :plan_lesson_classes

  validates :name, presence: true
  validates :price, presence: true

  def self.default_plan
    self.first
  end

  def self.trial_plan
    self.find_by(name: '体験コース')
  end
end
