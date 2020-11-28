module V1
  class LessonSerializer < ActiveModel::Serializer
    attributes :id, :class_name, :start_at, :end_at, :color, :class_memo, :joined, :lesson_class_id

    # admin の場合だけ参加者一覧を出力する
    has_many :users, if: -> { is_admin_user? }

    def joined
      object.joined?(current_user)
    end

    # 体験申し込みの場合は current_user が存在しない
    def is_admin_user?
      return false unless current_user
      current_user.is_admin?
    end
  end
end
