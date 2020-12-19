module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :first_name, :last_name, :first_name_kana, :last_name_kana, :age, :birthday, :phone_number, :role, :plans, :is_admin

    def is_admin
      object.is_admin?
    end
  end
end
