class Role < ApplicationRecord
  has_many :users

  validates :name, presence: true, uniqueness: true

  def admin?
    self.name == 'admin'
  end
end
