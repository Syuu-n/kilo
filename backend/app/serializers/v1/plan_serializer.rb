module V1
  class PlanSerializer < ActiveModel::Serializer
    attributes :id, :name, :price, :lesson_classes
  end
end
