module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :name, :name_kana, :age, :birthday, :phone_number,
               :plan
  end
end
