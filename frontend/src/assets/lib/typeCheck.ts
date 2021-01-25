import { User, LessonClass, Plan, Lesson } from 'responses/responseStructs';

export function implementsUser(arg: any): arg is User {
  return arg !== null &&
    typeof arg === "object" &&
    typeof arg.last_name === "string"
};

export function implementsLessonClass(arg: any): arg is LessonClass {
  return arg !== null &&
    typeof arg === "object" &&
    typeof arg.price === "number" &&
    typeof arg.description === "string"
};

export function implementsPlan(arg: any): arg is Plan {
  return arg !== null &&
    typeof arg === "object" &&
    typeof arg.price === "number" &&
    typeof arg.description === "undefined"
};

export function implementsLesson(arg: any): arg is Lesson {
  return arg !== null &&
    typeof arg === "object" &&
    typeof arg.joined === "boolean"
};