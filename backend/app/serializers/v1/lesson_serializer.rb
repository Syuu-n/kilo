module V1
  class LessonSerializer < ActiveModel::Serializer
    attributes :id, :name, :start_at, :end_at, :color, :description, :joined, :lesson_class_id,
    :location, :price, :for_children, :user_limit_count, :remaining_user_count

    def joined
      object.joined?(current_user)
    end
  end
end
