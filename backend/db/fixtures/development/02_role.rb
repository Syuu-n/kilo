roles = ['admin', 'normal','trial']

roles.each_with_index do |role, i|
  Role.seed(:id,
            {
              id: i + 1,
              name: role
            }
  )
end
