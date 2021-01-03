import { LessonColor } from 'assets/lib/lessonColors';

export interface CreateUserRequest {
  first_name:              string;
  last_name:               string;
  first_name_kana:         string;
  last_name_kana:          string;
  email:                   string;
  password:                string;
  birthday:                string;
  phone_number:            string;
  role_id:                 number;
  plan_ids:                number[];
};

export interface CreateTrialUserRequest {
  first_name:              string;
  last_name:               string;
  first_name_kana:         string;
  last_name_kana:          string;
  email:                   string;
  password:                string;
  birthday:                string;
  phone_number:            string;
  lesson_id:               number;
};

export interface CreateLessonClassRequest {
  name:             string;
  location:         string;
  description:      string;
  for_children:     boolean;
  color:            LessonColor;
  price:            number;
  user_limit_count: number;
};

export interface CreatePlanRequest {
  name:                 string;
  price:                number;
  lesson_class_ids:     number[];
}

export interface slotInfo {
  start: string | Date;
  end: string | Date;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
};