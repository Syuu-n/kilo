module V1
  class PlansController < ApplicationController
    before_action :permission_check, only: [:index, :create, :update, :destroy]
    before_action :setup_plan, only: [:update, :show, :destroy]

    # GET /plans
    def index
      render json: Plan.all, each_serializer: PlanSerializer
    end

    # POST /plans
    def create
      begin
        ActiveRecord::Base.transaction do
          @plan = Plan.new(
            name: plan_params[:name],
            price: plan_params[:price],
          )
          @plan.save!
          # クラスの設定
          lesson_classes = LessonClass.where(id: plan_params[:lesson_class_ids])
          lesson_classes.each do |lc|
            @plan.lesson_classes << lc
          end
        end
      rescue => e
        puts e
        render json: { code: 'plan_create_error' }, status: :unprocessable_entity
        return
      end
      render json: @plan, status: :created
    end

    # PATCH /plans/:id
    def update
      begin
        ActiveRecord::Base.transaction do
          @plan.update!(
            name: plan_params[:name],
            price: plan_params[:price],
          )
          @plan.save!
          # クラスの設定
          lesson_classes = LessonClass.where(id: plan_params[:lesson_class_ids])
          @plan.lesson_classes.destroy_all
          lesson_classes.each do |lc|
            @plan.lesson_classes << lc
          end
        end
      rescue => e
        puts e
        render json: { code: 'plan_update_error' }, status: :unprocessable_entity
        return
      end
      render json: @plan, status: :ok
    end

    # GET /plans/:id
    def show
      render json: @plan, status: :ok
    end

    # DELETE /plans/:id
    def destroy
      if @plan.destroy
        render json: { message: 'Plan deleted.' }, status: :ok
      else
        render json: { code: 'plan_delete_error'}, status: :bad_request
      end
    end

    private

    def setup_plan
      @plan = Plan.find_by(id: params[:id])
      unless @plan
        render json: { code: 'plan_not_found' }, status: :not_found and return
      end
    end

    def plan_params
      params.require(:plan).permit(:name, :price, lesson_class_ids: [])
    end
  end
end
