class AddLocationToLessons < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :location, :string
    add_column :lesson_classes, :location, :string
  end
end
