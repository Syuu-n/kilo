module V1
  class UsersController < ApplicationController
    # 認証が必要ないメソッドは skip_before_action に追加する
    skip_before_action :authenticate_user_from_token!, only: [:create]

    def index
      unless current_user.is_admin?
        render json: { error: 'not_permitted', status: :bad_request }
        return
      end

      render json: User.all, each_serializer: V1::UserSerializer
    end

    #  POST
    # ユーザ作成
    def create
      @user = User.new(user_params)
      @user.plan_id = Plan.first.id
      @user.role_id = Role.second.id

      if @user.save
        render json: @user, serializer: V1::SessionSerializer, root: nil
      else
        render json: { error: 'user_create_error', status: :unprocessable_entity }
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :name_kana, :email, :age, :phone_number, :password)
    end
  end
end
