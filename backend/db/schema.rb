# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_24_135003) do

  create_table "lesson_classes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "lesson_rule"
  end

  create_table "lessons", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "lesson_class_id"
    t.datetime "start_at"
    t.datetime "end_at"
    t.bigint "user_id"
    t.index ["lesson_class_id"], name: "index_lessons_on_lesson_class_id"
    t.index ["user_id"], name: "index_lessons_on_user_id"
  end

  create_table "plans", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name"
    t.integer "price"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name"
    t.string "name_kana"
    t.string "email"
    t.string "password_digest"
    t.integer "age"
    t.string "school_grade"
    t.integer "phone_number"
    t.bigint "plan_id"
    t.index ["plan_id"], name: "index_users_on_plan_id"
  end

end
