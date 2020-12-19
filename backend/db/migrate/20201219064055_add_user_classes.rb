class AddUserClasses < ActiveRecord::Migration[6.0]
  def change
    create_table :user_plans do |t|
      t.references :user, index: true, foreign_key: true
      t.references :plan, index: true, foreign_key: true
    end

    create_table :plan_lesson_classes do |t|
      t.references :plan, index: true, foreign_key: true
      t.references :lesson_class, index: true, foreign_key: true
    end

    remove_reference :users, :plan, index: true

    remove_column :plans, :monthly_lesson_count, :integer
    remove_column :plans, :for_children, :boolean

    add_column :lesson_classes, :price, :integer
    add_column :lessons, :price, :integer

    add_column :lesson_classes, :for_children, :boolean, default: false, null: false
    add_column :lessons, :for_children, :boolean, default: false, null: false
  end
end
