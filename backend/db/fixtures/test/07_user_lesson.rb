Faker::Config.locale = 'ja'

15.times do |i|
  UserLesson.seed(:id,
                    {
                      id: i + 1,
                      user_id: rand(1..3),
                      lesson_id: rand(1..15)
                    }
  )
end
