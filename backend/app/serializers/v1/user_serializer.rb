module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :name, :name_kana, :age, :birthday, :phone_number, :role, :plan, :current_monthly_count, :remaining_monthly_count

    def role
      object.role.name
    end
  end
end
