# coding: utf-8
Faker::Config.locale = 'ja'

unless Role.exists?
  roles = ['admin', 'normal', 'trial']
  roles.each do |role|
    Role.create(name: role)
  end
end

unless Plan.exists?
  Plan.create(
    name: 'Basic Class',
    price: 3000
  )
end

unless User.exists?
  User.create(
    email: 'kato@example.com',
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    first_name_kana: Faker::Ancient.god,
    last_name_kana: Faker::Creature::Animal.name,
    birthday: Time.current - rand(1..100).year,
    phone_number: Faker::PhoneNumber.cell_phone,
    plan_id: Plan.default_plan,
    role_id: Role.admin,
    password: 'password',
    )

  roles = ['normal', 'trial']
  roles.each do |role|
    User.create(
      email: "#{role}@example.com",
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      first_name_kana: Faker::Ancient.god,
      last_name_kana: Faker::Creature::Animal.name,
      birthday: Time.current - rand(1..100).year,
      phone_number: Faker::PhoneNumber.cell_phone,
      plan_id: Plan.default_plan,
      role_id: Role.send(role),
      password: 'password',
      )
  end
end
