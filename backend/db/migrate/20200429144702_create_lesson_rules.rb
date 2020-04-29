class CreateLessonRules < ActiveRecord::Migration[6.0]
  def change
    create_table :lesson_rules do |t|
      t.integer :dotw
      t.time :start_at
      t.time :end_at
      t.references :lesson_class, index: true, foreign_key: true
      t.timestamps
    end

    remove_column :lesson_classes, :lesson_rule, :string

  end
end
