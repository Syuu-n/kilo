class Lesson < ApplicationRecord
  belongs_to :lesson_class

  validations :start_at, presence: true
  validations :end_at, presence: true
end
