module V1
  class TrialsController < ApplicationController
    class EmailAlreadyExistsError < StandardError; end

    skip_before_action :authenticate_user_from_token!, only: [:create, :update, :lesson_classes_for_trial, :lessons_for_trial]

    # POST /trials
    def create
      begin
        ActiveRecord::Base.transaction do
          @user = User.new(
            last_name: create_params[:last_name],
            first_name: create_params[:first_name],
            last_name_kana: create_params[:last_name_kana],
            first_name_kana: create_params[:first_name_kana],
            email: create_params[:email],
            password: create_params[:password],
            birthday: create_params[:birthday],
            phone_number: create_params[:phone_number],
          )
          @user.plan = Plan.trial_plan
          @user.role = Role.trial

          if User.find_by(email: @user.email)
            raise EmailAlreadyExistsError
          end

          @user.save!
          @lesson = Lesson.find(create_params[:lesson_id])
          @lesson.join(@user)
        end
      rescue => e
        puts e
        case e
          when EmailAlreadyExistsError
            render json: { code: 'email_already_exists_error' }, status: :bad_request
            return
          else
            render json: { code: 'trial_request_create_error' }, status: :unprocessable_entity
            return
        end
      end
      render json: { message: 'Trial request mail was sent.' }, status: :created
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

    # GET /trials/lesson_classes
    def lesson_classes_for_trial
      classes = LessonClass.all
      render json: classes, each_serializer: LessonClassSerializer
    end

    # GET /trials/lessons
    def lessons_for_trial
      # 今月と来月のレッスンを取得
      range = Time.current..Time.current.next_month.end_of_month
      lessons = Lesson.where(start_at: range)
      render json: lessons, each_serializer: LessonSerializer
    end

    private

    def create_params
      params.require(:user).permit(:email, :password, :first_name, :last_name, :first_name_kana, :last_name_kana, :birthday, :phone_number, :lesson_id)
    end

    def update_params
      params.require(:user).permit(:confirmation_token)
    end
  end
end
