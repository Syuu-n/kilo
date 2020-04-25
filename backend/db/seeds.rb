# coding: utf-8

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
    name: 'Kato',
    name_kana: 'カトウ',
    age: 23,
    phone_number: 000000000,
    plan_id: Plan.first.id,
    role_id: Role.first.id,
    email: 'kato@gmail.com',
    password: 'password',
    )
end
