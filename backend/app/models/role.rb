class Role < ApplicationRecord
  has_many :users

  validates :name, presence: true, uniqueness: true

  def admin?
    name == 'admin'
  end

  def trial?
    name == 'trial'
  end

  def self.admin
    self.find_by(name: 'admin')
  end

  def self.normal
    self.find_by(name: 'normal')
  end

  def self.trial
    self.find_by(name: 'trial')
  end
end
