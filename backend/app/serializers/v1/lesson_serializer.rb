module V1
  class LessonSerializer < ActiveModel::Serializer
    attributes :id, :class_name, :start_at, :end_at

    # admin の場合だけ参加者一覧を出力する
    has_many :users, if: -> { current_user.is_admin? }
  end
end
