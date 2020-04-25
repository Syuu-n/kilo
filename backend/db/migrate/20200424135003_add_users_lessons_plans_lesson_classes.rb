class AddUsersLessonsPlansLessonClasses < ActiveRecord::Migration[6.0]
  def change
    create_table :plans do |t|
      t.string :name
      t.integer :price
    end

    create_table :lesson_classes do |t|
      t.string :name
      t.text :description
      t.string :lesson_rule
    end

    create_table :lessons do |t|
      t.references :lesson_class, index: true
      t.datetime :start_at
      t.datetime :end_at
      t.references :user, index: true
    end
  end
end
