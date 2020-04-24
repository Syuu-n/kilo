class AddUsersLessonsPlansLessonClasses < ActiveRecord::Migration[6.0]
  def change
    create_table :plans do |t|
      t.string :name
      t.integer :price
    end

    create_table :users do |t|
      t.string :name
      t.string :name_kana
      t.string :email
      t.string :password_digest
      t.integer :age
      t.string :school_grade
      t.integer :phone_number
      t.references :plan, index: true
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
