Faker::Config.locale = 'ja'

Plan.seed(:id,
  { id: 1,
    name: "大人クラス",
    price: 0,
  }
)

3.times do |i|
  Plan.seed(:id,
            { id: i + 2,
              name: Faker::Space.galaxy,
              price: rand(1000..5000),
            }
  )
end

Plan.seed(:id,
  { id: 5,
    name: "体験コース",
    price: 0,
  }
)
