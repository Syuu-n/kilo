class AddDisplayNameToRole < ActiveRecord::Migration[6.0]
  def change
    add_column :roles, :display_name, :string
  end
end
