module V1
  class SessionSerializer < ActiveModel::Serializer
    attributes :access_token, :access_token_expire
  end
end
