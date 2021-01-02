module V1
  class LessonClassesController < ApplicationController
    class LessonRuleInvalidError < StandardError; end
    before_action :permission_check, only: [:create, :update, :destroy]
    before_action :setup_lesson_class, only: [:update, :show, :destroy]

    # GET /lesson_classes
    def index
      classes = LessonClass.all
      render json: classes, each_serializer: LessonClassSerializer
    end

    # POST /lesson_classes
    def create
      begin
        ActiveRecord::Base.transaction do
          @lesson_class = LessonClass.create!(lesson_class_params)
          lesson_rule_params[:lesson_rules].each do |lesson_rule|
            start_at = Time.zone.parse(lesson_rule[:start_at])
            end_at = Time.zone.parse(lesson_rule[:end_at])
            # start_at と end_at の秒以下は切り捨てる
            lr = LessonRule.new(
              week: lesson_rule[:week],
              dotw: lesson_rule[:dotw],
              start_at: Time.zone.at(start_at.to_i / 60 * 60),
              end_at: Time.zone.at(end_at.to_i / 60 * 60),
              lesson_class: @lesson_class,
            )
            unless lr.save
              raise LessonRuleInvalidError
            end
          end
        end
      rescue => e
        case e
        when LessonRuleInvalidError
          render json: { code: 'lesson_rule_invalid_error' }, status: :unprocessable_entity
          return
        else
          render json: { code: 'lesson_class_create_error' }, status: :unprocessable_entity
          return
        end
      end
      render json: @lesson_class, status: :created
    end

    # PATCH /lesson_classes/:id
    def update
      begin
        ActiveRecord::Base.transaction do
          @lesson_class.update!(lesson_class_params)
          @lesson_class.lesson_rules.each do |lr|
            lr.destroy!
          end
          lesson_rule_params[:lesson_rules].each do |lesson_rule|
            start_at = Time.zone.parse(lesson_rule[:start_at])
            end_at = Time.zone.parse(lesson_rule[:end_at])
            # start_at と end_at の秒以下は切り捨てる
            lr = LessonRule.new(
              week: lesson_rule[:week],
              dotw: lesson_rule[:dotw],
              start_at: Time.zone.at(start_at.to_i / 60 * 60),
              end_at: Time.zone.at(end_at.to_i / 60 * 60),
              lesson_class: @lesson_class,
            )
            unless lr.save
              raise LessonRuleInvalidError
            end
          end
        end
      rescue => e
        case e
        when LessonRuleInvalidError
          render json: { code: 'lesson_rule_invalid_error' }, status: :unprocessable_entity
          return
        else
          render json: { code: 'lesson_class_update_error' }, status: :unprocessable_entity
          return
        end
      end
      @lesson_class.reload
      render json: @lesson_class, status: :ok
    end

    # GET /lesson_classes/:id
    def show
      render json: @lesson_class, status: :ok
    end

    # DELETE /lesson_classes/:id
    def destroy
      if @lesson_class.destroy
        render json: { message: 'Lesson Class deleted.' }, status: :ok
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

    def lesson_class_params
      params.require(:lesson_class).permit(:name, :location, :description, :price, :for_children, :color)
    end

    def lesson_rule_params
      params.require(:lesson_class).permit(:name, :location, :description, :price, :for_children, :color,
                                           { lesson_rules: [:week, :dotw, :start_at, :end_at]}
      )
    end
  end
end
