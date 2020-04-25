class AddRole < ActiveRecord::Migration[6.0]
  def change
    create_table :roles do |t|
      t.string :name
    end

    add_reference :users, :role, foreign_key: true
  end
end
