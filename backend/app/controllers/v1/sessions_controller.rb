module V1
  class SessionsController < ApplicationController
    skip_before_action :authenticate_user_from_token!

    # POST /v1/login
    def create
      @user = User.find_for_database_authentication(email: params[:email])
      return invalid_email_or_email unless @user

      if @user.valid_password?(params[:password])
        sign_in :user, @user
        render json: @user, serializer: SessionSerializer
      else
        invalid_email_or_email
      end
    end

    private

    def invalid_email_or_email
      render json: { code: 'invalid_email_or_password' }, status: :bad_request
    end
  end
end
