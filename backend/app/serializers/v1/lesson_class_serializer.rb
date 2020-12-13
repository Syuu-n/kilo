module V1
  class LessonClassSerializer < ActiveModel::Serializer
    attributes :id, :name, :location, :description, :color

    has_many :lesson_rules
  end
end
