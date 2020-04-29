module V1
  class PlansController < ApplicationController
    before_action :authenticate_user_from_token!
    before_action :permission_check, only: [:index, :create, :update, :destroy]
    before_action :setup_plan, only: [:update, :show, :destroy]

    # GET /plans
    def index
      render json: Plan.all, each_serializer: PlanSerializer
    end

    # POST /plans
    def create
      @plan = Plan.new(plan_params)

      if @plan.save
        render json: @plan, status: :created
      else
        render json: { code: 'plan_create_error' }, status: :unprocessable_entity
      end
    end

    # PATCH /plans/:id
    def update
      if @plan.update(plan_params)
        render json: @plan, status: :ok
      else
        render json: { code: 'plan_update_error' }, status: :unprocessable_entity
      end
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
      params.require(:plan).permit(:name, :price, :monthly_lesson_count, :for_children)
    end
  end
end
