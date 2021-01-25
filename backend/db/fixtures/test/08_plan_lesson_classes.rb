PlanLessonClass.destroy_all

children_classes = LessonClass.where(for_children: true)
adult_classes = LessonClass.where(for_children: false)
lesson_classes = LessonClass.all

adult_classes.each_with_index do |ac, i|
  PlanLessonClass.seed(:id,
    {
      id: i + 1,
      plan_id: 1,
      lesson_class_id: ac.id,
    }
  )
end

last_id = PlanLessonClass.last.id

3.times do |i|
  PlanLessonClass.seed(:id,
    {
      id: last_id + i + 1,
      plan_id: i + 2,
      lesson_class_id: children_classes.sample.id,
    }
  )
end

last_id = PlanLessonClass.last.id

lesson_classes.each_with_index do |lc, i|
  PlanLessonClass.seed(:id,
    {
      id: last_id + i + 1,
      plan_id: 5,
      lesson_class_id: lc.id,
    }
  )
end