Faker::Config.locale = 'ja'

3.times do |i|
  Plan.seed(:id,
            { id: i + 1,
              name: Faker::Space.galaxy,
              price: rand(100..5000),
              monthly_lesson_count: rand(1..8),
              for_children: Faker::Boolean.boolean
            }
  )
end

Plan.seed(:id,
  { id: 4,
    name: Faker::Space.galaxy,
    price: rand(100..5000),
    monthly_lesson_count: 0,
    for_children: Faker::Boolean.boolean
  }
)
