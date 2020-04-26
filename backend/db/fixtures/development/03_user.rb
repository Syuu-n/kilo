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
            password: 'password'
          }
)

roles = ['normal', 'trial']
roles.each_with_index do |role, i|
  User.seed(:id,
            {
              id: i + 2,
              email: "#{role}@example.com",
              first_name: Faker::Name.first_name,
              last_name: Faker::Name.last_name,
              first_name_kana: Faker::Ancient.god,
              last_name_kana: Faker::Creature::Animal.name,
              birthday: Time.current - rand(1..100).year,
              phone_number: Faker::PhoneNumber.cell_phone,
              plan: Plan.default_plan,
              role: Role.send(role),
              password: 'password'
            }
  )
end
