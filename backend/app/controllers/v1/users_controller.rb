module V1
  class UsersController < ApplicationController
    # 認証が必要ないメソッドは skip_before_action に追加する
    skip_before_action :authenticate_user_from_token!, only: []
    before_action :permission_check, only: [:index, :create, :destroy]
    before_action :setup_user, only: [:update, :show, :destroy]

    # GET /users
    def index
      render json: User.all, each_serializer: UserSerializer
    end

    # POST /users
    def create
      @user = User.new(create_params)
      @user.plan = Plan.default_plan
      @user.role = Role.normal

      if @user.save
        render json: @user, status: :created
      else
        render json: { code: 'user_create_error' }, status: :unprocessable_entity
      end
    end

    # PATCH /users/:id
    def update
      if @user.update(update_params)
        render json: @user, status: :ok
      else
        render json: { code: 'user_update_error' }, status: :unprocessable_entity
      end
    end

    # GET /users/:id
    def show
      render json: @user, status: :ok
    end

    # DELETE /users/:id
    def destroy
      if @user.destroy
        render json: { message: 'User deleted.' }, status: :ok
      else
        render json: { code: 'user_delete_error' }, status: :bad_request
      end
    end

    private

    def setup_user
      @user = User.find_by(id: params[:id])
      unless @user
        render json: { code: 'user_not_found' }, status: :not_found and return
      end

      if @user != current_user && !current_user.is_admin?
        render json: { code: 'not_permitted' }, status: :forbidden and return
      end
    end

    def create_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :first_name_kana, :last_name_kana, :birthday, :phone_number)
    end

    def update_params
      params.require(:user).permit(:first_name, :last_name, :first_name_kana, :last_name_kana, :birthday, :phone_number)
    end
  end
end
