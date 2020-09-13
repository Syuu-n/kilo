import { Event } from 'react-big-calendar';

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

export type LessonColor = 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'rose';

export interface Lesson {
  id:         number;
  class_name: string;
  class_memo: string;
  start_at:   Date;
  end_at:     Date;
  users:      User[];
  color:      LessonColor;
  joined:     boolean;
}

export interface CEvent extends Event {
  lessonId: number;
  color:    LessonColor;
  joined:   boolean;
  memo:     string;
  users:    User[];
}