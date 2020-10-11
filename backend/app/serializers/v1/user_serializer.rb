module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :name, :name_kana, :age, :birthday, :phone_number, :role, :plan, :current_monthly_count, :remaining_monthly_count, :is_admin

    def is_admin
      object.is_admin?
    end
  end
end
