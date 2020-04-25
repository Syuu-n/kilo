module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :created_at, :updated_at
  end
end
