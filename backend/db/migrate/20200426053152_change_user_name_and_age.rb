class ChangeUserNameAndAge < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :name, :string
    remove_column :users, :name_kana, :string
    remove_column :users, :age, :integer
    remove_column :users, :phone_number, :integer

    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :first_name_kana, :string
    add_column :users, :last_name_kana, :string
    add_column :users, :birthday, :date
    add_column :users, :phone_number, :string
  end
end
