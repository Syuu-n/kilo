class Plan < ApplicationRecord
  has_many :users

  validates :name, presence: true
  validates :price, presence: true

  def self.default_plan
    self.first.id
  end
end
