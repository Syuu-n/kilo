module V1
  class LessonClassSerializer < ActiveModel::Serializer
    attributes :id, :name, :location, :description, :color, :price, :for_children, :user_limit_count

    has_many :lesson_rules
  end
end
