# coding: utf-8

unless Plan.exists?
  Plan.create(
    name: '大人クラス',
    price: 3000
  )
end

unless User.exists?
  User.create(
    name: '加藤 修宏',
    name_kana: 'カトウ ノブヒロ',
    age: 23,
    phone_number: 000000000,
    plan_id: 1,
    email: 'kato@gmail.com',
    password: 'password'
    )
end
