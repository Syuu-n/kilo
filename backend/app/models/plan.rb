class Plan < ApplicationRecord
  has_many :users

  validations :name, presence: true
  validations :price, presence: true
end
