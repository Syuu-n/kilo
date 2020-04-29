class AddCountAndChildrenToPlans < ActiveRecord::Migration[6.0]
  def change
    add_column :plans, :monthly_lesson_count, :integer, default: 0, null: false
    add_column :plans, :for_children, :boolean, default: false, null: false
  end
end
