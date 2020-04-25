class Plan < ApplicationRecord
  has_many :users

  validates :name, presence: true
  validates :price, presence: true
end
