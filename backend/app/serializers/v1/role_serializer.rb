module V1
  class RoleSerializer < ActiveModel::Serializer
    attributes :id, :name, :display_name
  end
end
