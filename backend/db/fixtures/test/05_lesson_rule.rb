Faker::Config.locale = 'ja'

10.times do |i|
  start_at = rand(0..23)
  LessonRule.seed(:id,
                    {
                      id: i + 1,
                      week: rand(0..4),
                      dotw: rand(0..6),
                      start_at: Time.current.beginning_of_day + start_at.hours,
                      end_at: Time.current.beginning_of_day + start_at.hours + 1.hours,
                      lesson_class_id: rand(1..5)
                    }
  )
end
