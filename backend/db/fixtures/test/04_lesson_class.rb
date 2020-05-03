Faker::Config.locale = 'ja'

LessonClass.seed(:id,
              {
                id: 1,
                name: Faker::Address.city,
                description: Faker::Lorem.word
              }
)

LessonClass.seed(:id,
              {
                id: 2,
                name: Faker::Address.city,
                description: Faker::Lorem.word
              }
)

LessonClass.seed(:id,
              {
                id: 3,
                name: Faker::Address.city,
                description: Faker::Lorem.word
              }
)
