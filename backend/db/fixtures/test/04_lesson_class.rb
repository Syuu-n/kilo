Faker::Config.locale = 'ja'

lessonColor = ['', 'rose', 'green', 'azure', 'orange']

LessonClass.seed(:id,
              {
                id: 1,
                name: Faker::Address.city,
                description: Faker::Lorem.paragraph(sentence_count: 20),
                color: lessonColor.sample,
              }
)

LessonClass.seed(:id,
              {
                id: 2,
                name: Faker::Address.city,
                description: Faker::Lorem.paragraph(sentence_count: 20),
                color: lessonColor.sample,
              }
)

LessonClass.seed(:id,
              {
                id: 3,
                name: Faker::Address.city,
                description: Faker::Lorem.paragraph(sentence_count: 20),
                color: lessonColor.sample,
              }
)
