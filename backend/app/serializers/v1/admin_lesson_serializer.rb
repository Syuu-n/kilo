module V1
  class AdminLessonSerializer < ActiveModel::Serializer
    attributes :id, :name, :start_at, :end_at, :color, :description, :joined, :lesson_class_id,
    :location, :price, :for_children, :user_limit_count, :remaining_user_count

    # admin の場合だけ参加者一覧を出力する
    has_many :users, if: -> { current_user.is_admin? }

    def joined
      object.joined?(current_user)
    end
  end
end
