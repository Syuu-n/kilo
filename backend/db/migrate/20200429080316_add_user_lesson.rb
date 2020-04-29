class AddUserLesson < ActiveRecord::Migration[6.0]
  def change
    create_table :user_lessons do |t|
      t.references :user, index: true, foreign_key: true
      t.references :lesson, index: true, foreign_key: true
    end

    remove_index :lessons, :user_id
    remove_reference :lessons, :user
  end
end
