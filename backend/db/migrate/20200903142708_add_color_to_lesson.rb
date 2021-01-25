class AddColorToLesson < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :color, :string
    add_column :lesson_classes, :color, :string
  end
end
