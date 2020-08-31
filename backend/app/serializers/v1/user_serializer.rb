module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :name, :name_kana, :age, :birthday, :phone_number, :role, :plan

    def role
      object.role.name
    end
  end
end
