module V1
  class UsersController < ApplicationController
    skip_before_action :authenticate_user_from_token!, only: []
    before_action :permission_check, only: [:index, :create, :destroy, :update]
    before_action :setup_user, only: [:update, :show, :destroy, :my_lessons, :my_plan]

    # GET /users
    def index
      users = User.all
      render json: users, each_serializer: UserSerializer
    end

    # POST /users
    def create
      if User.find_by(email: create_params[:email])
        render json: { code: 'email_already_exists_error' }, status: :bad_request
        return
      end

      begin
        ActiveRecord::Base.transaction do
          @user = User.new(
            email: create_params[:email],
            password: create_params[:password],
            first_name: create_params[:first_name],
            last_name: create_params[:last_name],
            first_name_kana: create_params[:first_name_kana],
            last_name_kana: create_params[:last_name_kana],
            birthday: create_params[:birthday],
            phone_number: create_params[:phone_number],
            role_id: create_params[:role_id],
          )
          @user.skip_confirmation!
          @user.save!
          # プランの設定
          plans = Plan.where(id: create_params[:plan_ids])
          plans.each do |plan|
            @user.plans << plan
          end
        end
      rescue => e
        puts e
        render json: { code: 'user_create_error' }, status: :unprocessable_entity
        return
      end
      render json: @user, status: :created
    end

    # PATCH /users/:id
    def update
      begin
        ActiveRecord::Base.transaction do
          @user.skip_reconfirmation!
          @user.update!(
            email: update_params[:email],
            first_name: update_params[:first_name],
            last_name: update_params[:last_name],
            first_name_kana: update_params[:first_name_kana],
            last_name_kana: update_params[:last_name_kana],
            birthday: update_params[:birthday],
            phone_number: update_params[:phone_number],
            role_id: update_params[:role_id],
          )
          # プランの設定
          plans = Plan.where(id: update_params[:plan_ids])
          @user.plans.destroy_all
          plans.each do |plan|
            @user.plans << plan
          end
        end
      rescue => e
        puts e
        render json: { code: 'user_update_error' }, status: :unprocessable_entity
        return
      end
      render json: @user, status: :ok
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

    # GET /users/:id/lessons
    def my_lessons
      render json: @user.lessons, status: :ok
    end

    # GET /users/:id/plan
    def my_plan
      render json: @user.plan, status: :ok
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
      params.require(:user).permit(:email, :password, :first_name, :last_name, :first_name_kana, :last_name_kana, :birthday, :phone_number, :role_id, plan_ids: [])
    end

    def update_params
      params.require(:user).permit(:email, :first_name, :last_name, :first_name_kana, :last_name_kana, :birthday, :phone_number, :role_id, plan_ids: [])
    end
  end
end
