module V1
  class LessonClassSerializer < ActiveModel::Serializer
    attributes :id, :name, :description

    has_many :lesson_rules
  end
end
