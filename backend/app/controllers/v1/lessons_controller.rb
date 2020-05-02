module V1
  class LessonsController < ApplicationController
    before_action :permission_check, only: [:index, :create, :update, :show, :destroy]
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
      if @lesson.joined?(current_user)
        render json: { code: 'user_already_joined' }, status: :bad_request and return
      end

      if @lesson.join(current_user)
        render json: { message: 'User join success.' }, status: :ok
      else
        render json: { code: 'user_join_failed' }, status: :bad_request
      end
    end

    # DELETE /lessons/:id/leave
    def user_leave
      unless @lesson.joined?(current_user)
        render json: { code: 'user_not_joined' }, status: :bad_request and return
      end

      if @lesson.leave(current_user)
        render json: { message: 'User leave success.' }, status: :ok
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
      params.require(:lesson).permit(:lesson_class_id, :start_at, :end_at)
    end
  end
end
