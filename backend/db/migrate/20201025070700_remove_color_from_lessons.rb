class RemoveColorFromLessons < ActiveRecord::Migration[6.0]
  def up
    remove_column :lessons, :color
  end

  def down
    add_column :lessons, :color, :string
  end
end
