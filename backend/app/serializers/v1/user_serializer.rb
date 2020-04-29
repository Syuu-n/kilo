module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :email, :first_name, :last_name, :first_name_kana, :last_name_kana, :birthday, :phone_number,
               :school_grade, :plan_name

    def plan_name
      object.plan.name
    end
  end
end
