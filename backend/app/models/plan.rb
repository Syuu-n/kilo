class Plan < ApplicationRecord
  has_many :users

  validates :name, presence: true
  validates :price, presence: true
  validates :monthly_lesson_count, presence: true
  validates :for_children, inclusion: { in: [true, false] }

  def self.default_plan
    self.first
  end
end
