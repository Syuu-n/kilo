module V1
  class LessonsController < ApplicationController
    class AlreadyJoinedError < StandardError; end
    class CantJoinError < StandardError; end
    class CantJoinLessonClassError < StandardError; end
    class UserLimitCountError < StandardError; end
    class CantJoinOrLeaveTrialUserError < StandardError; end
    class NotJoinedError < StandardError; end
    class CantLeaveError < StandardError; end
    class AlreadyCreatedLessonsError < StandardError; end

    before_action :permission_check, only: [:create, :update, :destroy, :create_next_month_lessons]
    before_action :setup_lesson, only: [:update, :show, :destroy, :user_join, :user_leave]

    #  GET /lessons
    def index
      render json: Lesson.all, each_serializer: LessonSerializer
    end

    # POST /lessons
    def create
      begin
        ActiveRecord::Base.transaction do
          start_at = Time.zone.parse(create_params[:start_at])
          end_at = Time.zone.parse(create_params[:end_at])
          @lesson = Lesson.new(
            name: create_params[:name],
            description: create_params[:description],
            color: create_params[:color],
            lesson_class_id: create_params[:lesson_class_id],
            start_at: Time.zone.at(start_at.to_i / 60 * 60),
            end_at: Time.zone.at(end_at.to_i / 60 * 60),
            location: create_params[:location],
            price: create_params[:price],
            for_children: create_params[:for_children],
            user_limit_count: create_params[:user_limit_count],
          )
          @lesson.save!
          users = User.where(id: create_params[:user_ids])
          users.each do |user|
            @lesson.join(user, true)
          end
        end
      rescue => e
        puts e
        render json: { code: 'lesson_create_error' }, status: :unprocessable_entity and return
      end
      render json: @lesson, status: :created
    end

    # PATCH /lessons/:id
    def update
      begin
        ActiveRecord::Base.transaction do
          start_at = Time.zone.parse(update_params[:start_at])
          end_at = Time.zone.parse(update_params[:end_at])
          @lesson.update!(
            name: update_params[:name],
            description: update_params[:description],
            color: update_params[:color],
            start_at: Time.zone.at(start_at.to_i / 60 * 60),
            end_at: Time.zone.at(end_at.to_i / 60 * 60),
            location: update_params[:location],
            price: update_params[:price],
            for_children: update_params[:for_children],
            user_limit_count: update_params[:user_limit_count],
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
        puts e
        case e
        when Lesson::AlreadyJoinedError
          render json: { code: 'user_already_joined' }, status: :bad_request and return
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
      rescue => e
        case e
        when Lesson::CantJoinOrLeaveTrialUserError
          render json: { code: 'trial_user_cant_join_to_lesson' }, status: :bad_request and return
        when Lesson::AlreadyJoinedError
          render json: { code: 'user_already_joined' }, status: :bad_request and return
        when Lesson::CantJoinError
          render json: { code: 'cant_join_to_past_lesson' }, status: :bad_request and return
        when Lesson::CantJoinLessonClassError
          render json: { code: 'cant_join_to_this_lesson' }, status: :bad_request and return
        when Lesson::UserLimitCountError
          render json: { code: 'user_limit_count_error' }, status: :bad_request and return
        else
          render json: { code: 'user_join_failed' }, status: :bad_request and return
        end
      end
      render json: @lesson, status: :ok
    end

    # DELETE /lessons/:id/leave
    def user_leave
      begin
        @lesson.leave(current_user)
      rescue => e
        case e
        when Lesson::CantJoinOrLeaveTrialUserError
          render json: { code: 'trial_user_cant_leave_to_lesson' }, status: :bad_request and return
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

    # POST /lessons/create_lessons
    # 現在の lesson_rules を元に来月のレッスンを作成する
    def create_next_month_lessons
      begin
        # 既に来月のレッスンが 15 個以上存在する場合は作成済みとみなし処理を中断する
        next_month = Time.current.next_month
        raise AlreadyCreatedLessonsError if Lesson.where(start_at: next_month.beginning_of_month..next_month.end_of_month).count > 15
        ActiveRecord::Base.transaction do
          @lessons = []
          lesson_rules = LessonRule.all
          lesson_rules.each do |lr|
            lc = LessonClass.find(lr.lesson_class_id)
            # lesson_rule の week が 0(毎週)だった場合
            if lr.week == 0
              weeks = [1, 2, 3, 4]
              weeks.each do |week|
                date = Lesson.next_month_date_from_week_and_dotw(week, lr.dotw)
                if date
                  new_start_at = Time.zone.local(date.year, date.month, date.day, lr.start_at.hour, lr.start_at.min)
                  new_end_at = Time.zone.local(date.year, date.month, date.day, lr.end_at.hour, lr.end_at.min)
                  lesson = Lesson.new(
                    name: lc.name,
                    description: lc.description,
                    color: lc.color,
                    lesson_class_id: lr.lesson_class_id,
                    start_at: new_start_at,
                    end_at: new_end_at,
                    location: lc.location,
                    price: lc.price,
                    for_children: lc.for_children,
                    user_limit_count: lc.user_limit_count,
                  )
                  lesson.save!
                  @lessons.push(lesson)
                end
              end
            else
              date = Lesson.next_month_date_from_week_and_dotw(lr.week, lr.dotw)
              if date
                new_start_at = Time.zone.local(date.year, date.month, date.day, lr.start_at.hour, lr.start_at.min)
                new_end_at = Time.zone.local(date.year, date.month, date.day, lr.end_at.hour, lr.end_at.min)
                lesson = Lesson.new(
                  name: lc.name,
                  description: lc.description,
                  color: lc.color,
                  lesson_class_id: lr.lesson_class_id,
                  start_at: new_start_at,
                  end_at: new_end_at,
                  location: lc.location,
                  price: lc.price,
                  for_children: lc.for_children,
                  user_limit_count: lc.user_limit_count,
                )
                lesson.save!
                @lessons.push(lesson)
              end
            end
          end
          # 作成した翌月のレッスンのうち、子供コースのレッスンのみ会員ユーザを自動参加させる
          Lesson.join_lessons(@lessons.filter{|lesson| lesson.for_children == true})
        end
      rescue => e
        case e
        when AlreadyCreatedLessonsError
          render json: { code: 'already_created_lessons_error' }, status: :bad_request and return
        else
          puts e
          render json: { code: 'lesson_create_error' }, status: :unprocessable_entity and return
        end
      end
      render json: @lessons, status: :created
    end

    private

    def setup_lesson
      @lesson = Lesson.find_by(id: params[:id])
      unless @lesson
        render json: { code: 'lesson_not_found' }, status: :not_found and return
      end
    end

    def create_params
      params.require(:lesson).permit(:name, :description, :color, :lesson_class_id, :start_at, :end_at, :location, :price, :user_limit_count, :for_children, user_ids: [])
    end

    def update_params
      params.require(:lesson).permit(:name, :description, :color, :start_at, :end_at, :location, :price, :user_limit_count, :for_children, user_ids: [])
    end
  end
end
