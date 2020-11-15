module V1
  class LessonsController < ApplicationController
    class AlreadyJoinedError < StandardError; end
    class CantJoinedError < StandardError; end
    class NoCountError < StandardError; end
    class NotJoinedError < StandardError; end
    class CantLeaveError < StandardError; end

    before_action :permission_check, only: [:create, :update, :destroy]
    before_action :setup_lesson, only: [:update, :show, :destroy, :user_join, :user_leave]

    #  GET /lessons
    def index
      render json: Lesson.all, each_serializer: LessonSerializer
    end

    # POST /lessons
    def create
      @lesson = Lesson.new(create_params)

      if @lesson.save
        render json: @lesson, status: :created
      else
        render json: { code: 'lesson_create_error' }, status: :unprocessable_entity
      end
    end

    # PATCH /lessons/:id
    def update
      begin
        ActiveRecord::Base.transaction do
          start_at = Time.zone.parse(update_params[:start_at])
          end_at = Time.zone.parse(update_params[:end_at])
          @lesson.update!(
            start_at: Time.zone.at(start_at.to_i / 60 * 60),
            end_at: Time.zone.at(end_at.to_i / 60 * 60),
          )
          # NOTE: レッスンに参加している全てのユーザを辞退させてから、改めて参加し直していおる
          # パフォーマンス的にはあまり良くない気がする
          users = User.where(id: update_params[:user_ids])
          @lesson.leave_all
          users.each do |user|
            @lesson.join(user, true)
          end
        end
      rescue => e
        case e
        when Lesson::AlreadyJoinedError
          render json: { code: 'user_already_joined' }, status: :bad_request and return
        when Lesson::NoCountError
          render json: { code: 'user_monthly_limit_error' }, status: :bad_request and return
        else
          render json: { code: 'lesson_update_error' }, status: :unprocessable_entity and return
        end
      end
      render json: @lesson, status: :ok
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
      begin
        @lesson.join(current_user)
        rescue Lesson::AlreadyJoinedError => e
          render json: { code: 'user_already_joined' }, status: :bad_request and return
        rescue Lesson::CantJoinedError => e
          render json: { code: 'cant_join_to_past_lesson' }, status: :bad_request and return
        rescue Lesson::NoCountError => e
          render json: { code: 'user_monthly_limit_error' }, status: :bad_request and return
        rescue => e
          render json: { code: 'user_join_failed' }, status: :bad_request and return
      end
      render json: @lesson, status: :ok
    end

    # DELETE /lessons/:id/leave
    def user_leave
      begin
        @lesson.leave(current_user)
      rescue => e
        case e
        when Lesson::NotJoinedError
          render json: { code: 'user_not_joined' }, status: :bad_request and return
        when Lesson::CantLeaveError
          render json: { code: 'cant_leave_to_past_lesson' }, status: :bad_request and return
        else
          render json: { code: 'user_leave_failed' }, status: :bad_request and return
        end
      end
      @lesson.reload
      render json: @lesson, status: :ok
    end

    private

    def setup_lesson
      @lesson = Lesson.find_by(id: params[:id])
      unless @lesson
        render json: { code: 'lesson_not_found' }, status: :not_found and return
      end
    end

    def create_params
      params.require(:lesson).permit(:lesson_class_id, :start_at, :end_at)
    end

    def update_params
      params.require(:lesson).permit(:start_at, :end_at, user_ids: [])
    end
  end
end
