module V1
  class LessonsController < ApplicationController
    before_action :permission_check, only: [:create, :update, :destroy]
    before_action :setup_lesson, only: [:update, :show, :destroy, :user_join, :user_leave]

    #  GET /lessons
    def index
      render json: Lesson.all, each_serializer: LessonSerializer
    end

    # POST /lessons
    def create
      @lesson = Lesson.new(lesson_params)

      if @lesson.save
        render json: @lesson, status: :created
      else
        render json: { code: 'lesson_create_error' }, status: :unprocessable_entity
      end
    end

    # PATCH /lessons/:id
    def update
      if @lesson.update(lesson_params)
        render json: @lesson, status: :ok
      else
        render json: { code: 'lesson_update_error' }, status: :unprocessable_entity
      end
    end

    # GET /lessons/:id
    def show
      render json: @lesson, status: :ok
    end

    # DELETE /lessons/:id
    def destroy
      if @lesson.destroy
        render json: { message: 'Lesson deleted.' }, status: :ok
      else
        render json: { code: 'lesson_delete_error' }, status: :bad_request
      end
    end

    # POST /lessons/:id/join
    def user_join
      # 参加済みのレッスンへ再度参加した場合
      if @lesson.joined?(current_user)
        render json: { code: 'user_already_joined' }, status: :bad_request and return
      end

      # 参加しようとしているレッスンの開始時刻が過去である場合
      if Time.current > @lesson.start_at
        render json: { code: 'cant_join_to_post_lesson' }, status: :bad_request and return
      end

      # 今月の参加可能数が 0 である場合
      if current_user.remaining_monthly_count < 1
        render json: { code: 'user_monthly_limit_error' }, status: :bad_request and return
      end

      if @lesson.join(current_user)
        render json: @lesson, status: :ok
      else
        render json: { code: 'user_join_failed' }, status: :bad_request
      end
    end

    # DELETE /lessons/:id/leave
    def user_leave
      # 参加取り消し済みのレッスンへ再度参加取り消しをした場合
      unless @lesson.joined?(current_user)
        render json: { code: 'user_not_joined' }, status: :bad_request and return
      end

      # 参加取り消ししようとしているレッスンの開始時刻が過去である場合
      if Time.current > @lesson.start_at
        render json: { code: 'cant_leave_to_post_lesson' }, status: :bad_request and return
      end

      if @lesson.leave(current_user)
        render json: @lesson, status: :ok
      else
        render json: { code: 'user_leave_failed' }, status: :bad_request
      end
    end

    private

    def setup_lesson
      @lesson = Lesson.find_by(id: params[:id])
      unless @lesson
        render json: { code: 'lesson_not_found' }, status: :not_found and return
      end
    end

    def lesson_params
      params.require(:lesson).permit(:lesson_class_id, :start_at, :end_at, :color)
    end
  end
end
