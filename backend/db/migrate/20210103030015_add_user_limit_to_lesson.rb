class AddUserLimitToLesson < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :user_limit_count, :integer, default: 0, null: false
    add_column :lesson_classes, :user_limit_count, :integer, default: 0, null: false
  end
end
