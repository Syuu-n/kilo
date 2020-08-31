export interface User {
  id:           number;
  email:        string;
  name:         string;
  name_kana:    string;
  age:          number;
  birthday:     string;
  phone_number: string;
  role:         string;
  plan:         Plan;
}

export interface Plan {
  id:                   number;
  name:                 string;
  price:                number;
  monthly_lesson_count: number;
  for_children:         boolean;
}

export interface Lesson {
  id:         number;
  class_name: string;
  start_at:   Date;
  end_at:     Date;
  users:      User[]
}