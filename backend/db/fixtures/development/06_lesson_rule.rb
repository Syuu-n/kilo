Faker::Config.locale = 'ja'

5.times do |i|
  LessonRule.seed(:id,
                    {
                      id: i + 1,
                      dotw: rand(0..6),
                      start_at: Time.current.beginning_of_day + i.hours,
                      end_at: Time.current.beginning_of_day + i.hours + 1.hours,
                      lesson_class_id: rand(1..3)
                    }
  )
end
