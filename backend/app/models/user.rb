class User < ApplicationRecord
  belongs_to :plan

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validations :name, presence: true, uniqueness: true
  validations :name_kana, presence: true
  validations :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validations :password_digest, presence: true
  validations :age, presence: true
  validations :phone_number, presence: true
end
