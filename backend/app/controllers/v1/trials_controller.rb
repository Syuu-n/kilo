module V1
  class TrialsController < ApplicationController
    skip_before_action :authenticate_user_from_token!, only: [:create, :update]

    # POST /trials
    def create
      @user = User.new(create_params)
      @user.plan = Plan.default_plan
      @user.role = Role.trial

      if User.find_by(email: @user.email)
        render json: { code: 'email_already_exists_error' }, status: :bad_request
        return
      end

      if @user.save
        render json: @user, status: :ok
      else
        render json: { code: 'trial_request_create_error' }, status: :unprocessable_entity
      end
    end

    # PUT /trials
    def update
      user = User.find_by(confirmation_token: update_params[:confirmation_token])

      unless user
        render json: { code: 'invalid_confirmation_token_error' }, status: :bad_request
        return
      end

      if user.confirmed?
        render json: { code: 'user_already_confirmed_error' }, status: :bad_request
        return
      end

      user.confirm

      if user.confirmed?
        render json: user, status: :ok
      else
        render json: { code: 'user_confirmation_error' }, status: :unprocessable_entity
      end
    end

    private

    def create_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :first_name_kana, :last_name_kana, :birthday, :phone_number)
    end

    def update_params
      params.require(:user).permit(:confirmation_token)
    end
  end
end
