class AddColorDescNameToLessons < ActiveRecord::Migration[6.0]
  def change
    add_column :lessons, :name, :string
    add_column :lessons, :description, :text
    add_column :lessons, :color, :string
  end
end
