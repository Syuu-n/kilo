class AddWeekToLessonRules < ActiveRecord::Migration[6.0]
  def change
    add_column :lesson_rules, :week, :integer
  end
end
