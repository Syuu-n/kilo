module V1
  class LessonClassesController < ApplicationController
    before_action :authenticate_user_from_token!
    before_action :permission_check, only: [:create, :update, :destroy]
    before_action :setup_lesson_class, only: [:update, :show, :destroy]

    # GET /lesson_classes
    def index
      render json: LessonClass.all, each_serializer: LessonClassSerializer
    end

    # POST /lesson_classes
    def create
      @lesson_class = LessonClass.new(create_params)

      if @lesson_class.save
        render json: @lesson_class, status: :created
      else
        render json: { code: 'lesson_class_create_error' }, status: :unprocessable_entity
      end
    end

    # PATCH /lesson_classes/:id
    def update
      if @lesson_class.update(update_params)
        render json: @lesson_class, status: :ok
      else
        render json: { code: 'lesson_class_update_error' }, status: :unprocessable_entity
      end
    end

    # GET /lesson_classes/:id
    def show
      render json: @lesson_class, status: :ok
    end

    # DELETE /lesson_classes/:id
    def destroy
      if @lesson_class.destroy
        render json: { message: 'Lesson Class deleted' }, status: :ok
      else
        render json: { code: 'lesson_class_delete_error' }, status: :bad_request
      end
    end

    private

    def setup_lesson_class
      @lesson_class = LessonClass.find_by(id: params[:id])
      unless @lesson_class
        render json: { code: 'lesson_class_not_found' }, status: :not_found and return
      end
    end

    def create_params
      params.require(:lesson_class).permit(:name, :description,
                                           { lesson_rules_attributes: [:dotw, :start_at, :end_at]}
      )
    end

    def update_params
      params.require(:lesson_class).permit(:name, :description,
                                           { lesson_rules_attributes: [:id, :dotw, :start_at, :end_at]}
      )
    end
  end
end
