Faker::Config.locale = 'ja'

users = User.all
lessons = Lesson.all

30.times do |i|
  user = users.sample
  lesson = lessons.sample
  unless lesson.joined?(user)
    if user.remaining_monthly_count > 0
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
