Faker::Config.locale = 'ja'

lessonColor = ['', 'rose', 'green', 'azure', 'orange']

lessonColor.each_with_index do |lc, i|
  LessonClass.seed(:id,
    {
      id: i + 1,
      name: Faker::Address.city,
      description: Faker::Lorem.paragraph(sentence_count: 20),
      color: lc,
    }
  )
end