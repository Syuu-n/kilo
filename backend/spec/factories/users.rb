FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'password' }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    first_name_kana { Faker::Ancient.god }
    last_name_kana { Faker::Creature::Animal.name }
    birthday { Time.current - rand(1..100).year }
    phone_number { Faker::PhoneNumber.cell_phone }
    plan { Plan.default_plan }
    role { Role.normal }
  end

  factory :admin, class: User do
    email { Faker::Internet.email }
    password { 'password' }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    first_name_kana { Faker::Ancient.god }
    last_name_kana { Faker::Creature::Animal.name }
    birthday { Time.current - rand(1..100).year }
    phone_number { Faker::PhoneNumber.cell_phone }
    plan { Plan.default_plan }
    role { Role.admin }
  end
end
