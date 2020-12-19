Faker::Config.locale = 'ja'

lessonColor = ['', 'rose', 'green', 'azure', 'orange']

lessonColor.each_with_index do |lc, i|
  LessonClass.seed(:id,
    {
      id: i + 1,
      name: Faker::Address.city,
      location: Faker::University.name,
      description: Faker::Lorem.paragraph(sentence_count: 20),
      color: lc,
      price: rand(1000..5000),
      for_children: Faker::Boolean.boolean,
    }
  )
end

# LessonRule のない LessonClass の作成
LessonClass.seed(:id,
  {
    id: 6,
    name: "その他",
    location: "",
    description: "",
    color: "",
    price: rand(0),
    for_children: Faker::Boolean.boolean,
  }
)