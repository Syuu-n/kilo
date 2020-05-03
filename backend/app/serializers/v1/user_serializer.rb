module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :name, :name_kana, :birthday, :phone_number,
               :plan_name

    def name
      object.last_name + " " + object.first_name
    end

    def name_kana
      object.last_name_kana + " " + object.first_name_kana
    end

    def plan_name
      object.plan.name
    end
  end
end
