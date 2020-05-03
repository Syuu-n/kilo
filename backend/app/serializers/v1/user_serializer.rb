module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :name, :name_kana, :birthday, :phone_number,
               :plan_name

    def plan_name
      object.plan.name
    end
  end
end
