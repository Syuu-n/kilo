class Role < ApplicationRecord
  has_many :users

  validates :name, presence: true, uniqueness: true

  def admin?
    self.name == 'admin'
  end

  def self.admin
    self.find_by(name: 'admin').id
  end

  def self.normal
    self.find_by(name: 'normal').id
  end

  def self.trial
    self.find_by(name: 'trial').id
  end
end
