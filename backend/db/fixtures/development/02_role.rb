roles = [
  {name: 'admin', display_name: '管理者'},
  {name: 'normal', display_name: '会員'},
  {name: 'trial', display_name: '体験'},
]

roles.each_with_index do |role, i|
  Role.seed(:id,
            {
              id: i + 1,
              name: role[:name],
              display_name: role[:display_name],
            }
  )
end
