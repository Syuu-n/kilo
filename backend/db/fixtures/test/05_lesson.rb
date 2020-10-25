Faker::Config.locale = 'ja'

15.times do |i|
  Lesson.seed(:id,
                {
                  id: i + 1,
                  lesson_class_id: rand(1..3),
                  start_at: Time.current + i.days,
                  end_at: Time.current + 1.hours + i.days,
                }
  )
end
