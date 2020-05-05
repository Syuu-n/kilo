module V1
  class PasswordsController < ApplicationController
    skip_before_action :authenticate_user_from_token!, only: [:create, :update]

    # POST /v1/passwords
    def create
      user = User.find_by(email: create_params[:email])
      user&.send_reset_password_instructions
      render json: { message: 'Password reset mail was sent.' }, status: :ok
    end

    # PUT /v1/passwords
    def update
      unless update_params[:password] == update_params[:password_confirmation]
        render json: { code: 'password_not_match_error' }, status: :bad_request
        return
      end

      user = User.reset_password_by_token(update_params)

      if user.errors.details.has_key?(:reset_password_token)
        case user.errors.details[:reset_password_token].first[:error]
        when :expired
          render json: { code: 'reset_password_token_expired_error' }, status: :bad_request
          return
        else
          render json: { code: 'password_reset_error' }, status: :bad_request
          return
        end
      end

      if user.errors.empty?
        render json: user, status: :ok
      else
        render json: { code: 'password_reset_error' }, status: :bad_request
      end
    end

    private

    def create_params
      params.require(:user).permit(:email)
    end

    def update_params
      params.require(:user).permit(:password, :password_confirmation, :reset_password_token)
    end
  end
end
