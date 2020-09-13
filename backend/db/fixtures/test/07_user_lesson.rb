Faker::Config.locale = 'ja'

30.times do |i|
  user = User.find_by(id: rand(1..3))
  lesson = Lesson.find_by(id: rand(1..15))
  unless lesson.joined?(user)
    if user.remaining_monthly_count >= 1
      UserLesson.seed(:id,
                        {
                          id: i + 1,
                          user_id: user.id,
                          lesson_id: lesson.id,
                        }
      )
    end
  end
end
