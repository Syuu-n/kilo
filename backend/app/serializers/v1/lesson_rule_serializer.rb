module V1
  class LessonRuleSerializer < ActiveModel::Serializer
    attributes :id, :dotw, :start_at, :end_at
  end
end
