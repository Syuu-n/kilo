import { Event } from 'react-big-calendar';
import { LessonColor } from 'assets/lib/lessonColors';

export interface User {
  id:                      number;
  email:                   string;
  first_name:              string;
  last_name:               string;
  first_name_kana:         string;
  last_name_kana:          string;
  age:                     number;
  birthday:                string;
  phone_number:            string;
  role:                    Role;
  plan:                    Plan;
  current_monthly_count:   number;
  remaining_monthly_count: number;
  is_admin:                boolean;
  password?:               string;
}

export interface Plan {
  id:                   number;
  name:                 string;
  price:                number;
  monthly_lesson_count: number;
  for_children:         boolean;
}

export interface Role {
  id:   number;
  name: string;
  display_name: string;
}

export interface Lesson {
  id:               number;
  class_name:       string;
  class_memo:       string;
  start_at:         Date;
  end_at:           Date;
  users:            User[] | undefined;
  color:            LessonColor;
  joined:           boolean;
  lesson_class_id?: number;
}

export interface CEvent extends Event {
  id:               number;
  color:            LessonColor;
  joined:           boolean;
  memo:             string;
  users:            User[] | undefined;
  start:            Date;
  end:              Date;
  lesson_class_id?: number;
  name?:            string;
}

export interface LessonClass {
  id:           number;
  name:         string;
  description:  string;
  color:        LessonColor;
  lesson_rules: LessonRule[];
}

export interface LessonRule {
  id?:       number;
  week:     number;
  dotw:     number;
  start_at: Date;
  end_at:   Date;
}