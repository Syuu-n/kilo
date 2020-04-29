module V1
  class LessonSerializer < ActiveModel::Serializer
    attributes :lesson_class_name, :start_at, :end_at

    # admin の場合だけ参加者一覧を出力する
    has_many :users, if: -> { current_user.is_admin? }

    def lesson_class_name
      object.lesson_class.name
    end
  end
end
