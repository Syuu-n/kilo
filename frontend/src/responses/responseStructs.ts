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
  plans:                   Plan[];
  current_monthly_count:   number;
  is_admin:                boolean;
  password?:               string;
  user_lesson_classes:     LessonClass[];
}

export interface Plan {
  id:                   number;
  name:                 string;
  price:                number;
  lesson_classes:       LessonClass[];
}

export interface Role {
  id:   number;
  name: string;
  display_name: string;
}

export interface Lesson {
  id:               number;
  name:             string;
  description:      string;
  start_at:         Date;
  end_at:           Date;
  users:            User[] | undefined;
  color:            LessonColor;
  joined:           boolean;
  lesson_class_id?: number;
  location:         string;
  price:            number;
  for_children:     boolean;
  user_limit_count: number;
  remaining_user_count: number;
}

// name は体験申し込みの日付表示用
export interface CEvent extends Event {
  id:               number;
  color:            LessonColor;
  joined:           boolean;
  description:      string;
  users:            User[] | undefined;
  start:            Date;
  end:              Date;
  lesson_class_id?: number;
  location:         string;
  name?:            string;
  price:            number;
  for_children:     boolean;
  user_limit_count: number;
  remaining_user_count: number;
}

export interface LessonClass {
  id:               number;
  name:             string;
  location:         string;
  description:      string;
  color:            LessonColor;
  lesson_rules:     LessonRule[];
  price:            number;
  for_children:     boolean;
  user_limit_count: number;
}

export interface LessonRule {
  id?:       number;
  week:     number;
  dotw:     number;
  start_at: Date;
  end_at:   Date;
}