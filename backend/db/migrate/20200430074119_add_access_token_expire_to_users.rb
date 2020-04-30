class AddAccessTokenExpireToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :access_token_expire, :datetime
  end
end
