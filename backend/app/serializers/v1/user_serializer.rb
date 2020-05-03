module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :name, :name_kana, :birthday, :phone_number,
               :plan_name
  end
end
