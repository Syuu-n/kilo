module V1
  class UsersController < ApplicationController
    # 認証が必要ないメソッドは skip_before_action に追加する
    before_action :authenticate_user_from_token!
    before_action :permission_check

    def index
      render json: User.all, each_serializer: V1::UserSerializer
    end

    #  POST
    # ユーザ作成
    def create
      @user = User.new(user_params)
      @user.plan = Plan.default_plan
      @user.role = Role.normal

      if @user.save
        render json: @user, serializer: V1::SessionSerializer
      else
        render json: { code: 'user_create_error' }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :first_name_kana, :last_name_kana, :birthday, :phone_number)
    end
  end
end