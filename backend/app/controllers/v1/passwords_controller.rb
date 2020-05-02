module V1
  class PasswordsController < ApplicationController
    skip_before_action :authenticate_user_from_token!, only: [:create, :update]

    # POST /passwords
    def create
      user = User.find_by(email: create_params[:email])
      user&.send_reset_password_instructions
      render json: { message: 'password_reset_mail_sent' }, status: :ok
    end

    def update
      user = User.reset_password_by_token(update_params)
      puts user.attributes
      if user.id
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
