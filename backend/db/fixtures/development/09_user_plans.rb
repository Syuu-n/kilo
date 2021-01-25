UserPlan.destroy_all

admin_users = User.where(role: Role.admin)
normal_users = User.where(role: Role.normal)
trial_users = User.where(role: Role.trial)
plans = Plan.all

admin_users.each_with_index do |au, i|
  UserPlan.seed(:id,
    {
      id: i + 1,
      user_id: au.id,
      plan_id: 1,
    }
  )
  UserPlan.seed(:id,
    {
      id: i + 2,
      user_id: au.id,
      plan_id: 2,
    }
  )
  UserPlan.seed(:id,
    {
      id: i + 3,
      user_id: au.id,
      plan_id: 3,
    }
  )
  UserPlan.seed(:id,
    {
      id: i + 4,
      user_id: au.id,
      plan_id: 4,
    }
  )
end

last_id = UserPlan.last.id

normal_users.each_with_index do |nu, i|
  if Faker::Boolean.boolean == true
    # 大人コース
    UserPlan.seed(:id,
      {
        id: last_id + i + 1,
        user_id: nu.id,
        plan_id: 1,
      }
    )
  else
    # 子供コース
    UserPlan.seed(:id,
      {
        id: last_id + i + 1,
        user_id: nu.id,
        plan_id: rand(2..4),
      }
    )
  end
end

last_id = UserPlan.last.id

trial_users.each_with_index do |tu, i|
  UserPlan.seed(:id,
    {
      id: last_id + i + 1,
      user_id: tu.id,
      plan_id: 5,
    }
  )
end