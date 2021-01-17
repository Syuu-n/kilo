import { fetchApp, NetworkError } from 'request/fetcher';
import { Lesson, User, CEvent } from 'responses/responseStructs';
import { LessonColor } from 'assets/lib/lessonColors';
import { fetchCurrentUser, IAuthContext } from 'Auth';

// GET /v1/lessons
export const getLessons = async (): Promise<Lesson[] | undefined> => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }

  const res = await fetchApp(
    '/v1/lessons',
    'GET',
    accessToken
  )

  if (res instanceof NetworkError) {
    console.log('ServerError')
    return;
  }

  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    return;
  }
};

// GET /v1/lessons/lessons_for_admin
export const getLessonsForAdmin = async (): Promise<Lesson[] | undefined> => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }

  const res = await fetchApp(
    '/v1/lessons/lessons_for_admin',
    'GET',
    accessToken
  )

  if (res instanceof NetworkError) {
    console.log('ServerError')
    return;
  }

  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    return;
  }
};

// POST /v1/lessons
export const createLesson = async (
  startAt: moment.Moment | null, endAt: moment.Moment | null, description: string, price: number,
  color: LessonColor, forChildren: boolean, userLimitCount: number, location: string,
  snackBar: Function, updateFunc: Function, lessonClassId?: number, joinedUsers?: User[]
  ) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }
  if (!lessonClassId) {
    return;
  }

  const lesson = {
    lesson_class_id: lessonClassId,
    start_at: startAt?.toDate(),
    end_at: endAt?.toDate(),
    user_ids: joinedUsers?.map((user) => user.id),
    location: location,
    name: name,
    description: description,
    price: price,
    color: color,
    for_children: forChildren,
    user_limit_count: userLimitCount,
  };

  const res = await fetchApp(
    '/v1/lessons',
    'POST',
    accessToken,
    JSON.stringify({
      lesson,
    })
  )
  if (res instanceof NetworkError) {
    console.log('ServerError');
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }
  const json = await res.json();
  switch (res.status) {
    case 201:
      updateFunc(json, "add");
      snackBar('レッスンの作成に成功しました。', { variant: 'success' });
      break;
    case 400:
      snackBar('参加可能数を超えているユーザーが含まれているためレッスンを作成に失敗しました。', { variant: 'error' });
      break;
    case 422:
      snackBar('レッスンの作成に失敗しました。内容を確かめてください。', { variant: 'error' });
      break;
    default:
      snackBar('レッスンの作成に失敗しました。', { variant: 'error' });
  }
};

// PATCH /v1/lessons/:id
export const updateLesson = async (
  startAt: moment.Moment | null, endAt: moment.Moment | null, description: string, price: number,
  color: LessonColor, forChildren: boolean, userLimitCount: number, location: string,
  snackBar: Function, updateFunc: Function, lessonId?: number, joinedUsers?: User[]
) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }
  if (!lessonId) {
    return;
  }

  const lesson = {
    start_at: startAt?.toDate(),
    end_at: endAt?.toDate(),
    user_ids: joinedUsers?.map((user) => user.id),
    location: location,
    name: name,
    description: description,
    price: price,
    color: color,
    for_children: forChildren,
    user_limit_count: userLimitCount,
  };

  const res = await fetchApp(
    `/v1/lessons/${lessonId}`,
    'PATCH',
    accessToken,
    JSON.stringify({
      lesson,
    })
  )
  if (res instanceof NetworkError) {
    console.log('ServerError');
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }
  const json = await res.json();
  switch (res.status) {
    case 200:
      updateFunc(json, "update");
      snackBar('レッスン情報の変更に成功しました。', { variant: 'success' });
      break;
    case 400:
      switch (json.code) {
        case 'user_monthly_limit_error':
          snackBar('参加可能数を超えているユーザーが含まれているためレッスン情報の変更に失敗しました。', { variant: 'error' });
          break;
        default:
          snackBar('レッスン情報の変更に失敗しました。', { variant: 'error' });
      };
      break;
    case 404:
      snackBar(`ID:${lessonId}のレッスンが存在しないため変更に失敗しました。`, { variant: 'error' });
      break;
    case 422:
      snackBar('レッスン情報の変更に失敗しました。内容を確かめてください。', { variant: 'error' });
      break;
    default:
      snackBar('レッスン情報の変更に失敗しました。', { variant: 'error' });
  }
};

// DELETE /v1/lessons/:id
export const deleteLesson = async (lessonId: number, selectedEvent: CEvent, snackBar: Function, updateFunc?: Function) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }
  if (!lessonId) {
    return;
  }

  const res = await fetchApp(
    `/v1/lessons/${lessonId}`,
    'DELETE',
    accessToken,
  )
  if (res instanceof NetworkError) {
    console.log('ServerError');
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }
  switch (res.status) {
    case 200:
      if (updateFunc) updateFunc([selectedEvent], "delete");
      snackBar('レッスンの削除に成功しました。', { variant: 'success' });
      break;
    case 404:
      snackBar(`ID:${lessonId}のレッスンが存在しないため削除に失敗しました。`, { variant: 'error' });
      break;
    default:
      snackBar('レッスンの削除に失敗しました。', { variant: 'error' });
  }
};

// POST /v1/lessons/:id/join
export const joinLesson = async (snackBar: Function, updateFunc: Function, ctx: IAuthContext, lessonId?: number) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }
  const res = await fetchApp(
    `/v1/lessons/${lessonId}/join`,
    'POST',
    accessToken,
  )
  if (res instanceof NetworkError) {
    console.log('ServerError');
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }
  const json = await res.json();
  switch (res.status) {
    case 200:
      await fetchCurrentUser(ctx);
      updateFunc(json);
      snackBar('レッスンへの参加が成功しました。', { variant: 'success' });
      break;
    case 400:
      switch (json.code) {
        case 'trial_user_cant_join_to_lesson':
          snackBar('体験中は他のレッスンへの参加/取り消しはできません。', { variant: 'error' });
          break;
        case 'user_already_joined':
          snackBar('既に参加済みのレッスンへは参加できません。', { variant: 'error' });
          break;
        case 'cant_join_to_past_lesson':
          snackBar('過去または当日のレッスンへは参加できません。', { variant: 'error' });
          break;
        case 'cant_join_to_this_lesson':
          snackBar('現在のコースではこのレッスンへ参加できません。', { variant: 'error' });
          break;
        default:
          snackBar('レッスンへの参加に失敗しました。', { variant: 'error' });
      };
      break;
    default:
      snackBar('レッスンへの参加に失敗しました。', { variant: 'error' });
  }
};

// DELETE /v1/lessons/leave
export const leaveLesson = async (snackBar: Function, updateFunc: Function, ctx: IAuthContext, lessonId?: number) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }
  const res = await fetchApp(
    `/v1/lessons/${lessonId}/leave`,
    'DELETE',
    accessToken,
  )
  if (res instanceof NetworkError) {
    console.log('ServerError');
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }
  const json = await res.json();
  switch (res.status) {
    case 200:
      await fetchCurrentUser(ctx);
      updateFunc(json);
      snackBar('レッスンへの参加取り消しが成功しました。', { variant: 'success' });
      break;
    case 400:
      switch (json.code) {
        case 'trial_user_cant_leave_to_lesson':
          snackBar('体験中は他のレッスンへの参加/取り消しはできません。', { variant: 'error' });
          break;
        case 'user_not_joined':
          snackBar('参加していないレッスンを取り消すことはできません。', { variant: 'error' });
          break;
        case 'cant_leave_to_past_lesson':
          snackBar('過去または当日のレッスンへの参加を取り消すことはできません。', { variant: 'error' });
          break;
        default:
          snackBar('レッスンへの参加取り消しに失敗しました。', { variant: 'error' });
      };
      break;
    default:
      snackBar('レッスンへの参加取り消しに失敗しました。', { variant: 'error' });
  }
};

/**
 * Lesson の配列を CEvent の配列へ変換する
 * @param lessons 変換するレッスンの配列
 */
const convertLessonsToCEvents = (lessons: Lesson[]): CEvent[] => {
  const cEvents = lessons.map((lesson:Lesson) => ({
    id: lesson.id,
    title: lesson.name,
    start: new Date(lesson.start_at),
    end:   new Date(lesson.end_at),
    lesson_class_id: lesson.lesson_class_id,
    color: lesson.color,
    joined: lesson.joined,
    description: lesson.description ? lesson.description : '',
    users: lesson.users ? lesson.users : undefined,
    location: lesson.location,
    price: lesson.price,
    for_children: lesson.for_children,
    user_limit_count: lesson.user_limit_count,
    remaining_user_count: lesson.remaining_user_count,
  } as CEvent));
  return cEvents
};

// POST /v1/lessons/create_lessons
export const createLessons = async (snackBar: Function, updateFunc: Function) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }

  const res = await fetchApp(
    '/v1/lessons/create_lessons',
    'POST',
    accessToken,
  )
  if (res instanceof NetworkError) {
    console.log('ServerError');
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }
  const json: Lesson[] = await res.json();
  switch (res.status) {
    case 201:
      snackBar('来月のスケジュール作成に成功しました。', { variant: 'success' });
      updateFunc(convertLessonsToCEvents(json), "createLessons")
      break;
    case 400:
      snackBar('既に来月のスケジュールが作成済みのため失敗しました。', { variant: 'error' });
      break;
    case 422:
      snackBar('来月のスケジュール作成に失敗しました。', { variant: 'error' });
      break;
    default:
      snackBar('来月のスケジュール作成に失敗しました。', { variant: 'error' });
  };
};