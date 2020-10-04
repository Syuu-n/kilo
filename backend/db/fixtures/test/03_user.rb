Faker::Config.locale = 'ja'

User.seed(:id,
          {
            id: 1,
            email: 'kato@example.com',
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            first_name_kana: Faker::Ancient.god,
            last_name_kana: Faker::Creature::Animal.name,
            birthday: Time.current - rand(1..100).year,
            phone_number: Faker::PhoneNumber.cell_phone,
            plan: Plan.default_plan,
            role: Role.admin,
            password: 'password',
            confirmed_at: Time.current,
          }
)

roles = ['normal', 'trial']

30.times do |i|
  role = roles.sample
  User.seed(:id,
            {
              id: i + 2,
              email: "#{role}_#{i}@example.com",
              first_name: Faker::Name.first_name,
              last_name: Faker::Name.last_name,
              first_name_kana: Faker::Ancient.god,
              last_name_kana: Faker::Creature::Animal.name,
              birthday: Time.current - rand(1..100).year,
              phone_number: Faker::PhoneNumber.cell_phone,
              plan: Plan.default_plan,
              role: Role.send(role),
              password: 'password',
              confirmed_at: Time.current,
            }
  )
end
