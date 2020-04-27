module V1
  class SessionSerializer < ActiveModel::Serializer

    attributes :email, :access_token

  end
end
