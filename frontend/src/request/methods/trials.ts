import { fetchApp } from 'request/fetcher';
import { LessonClass, Lesson } from 'responses/responseStructs';
import { CreateTrialUserRequest } from 'request/requestStructs';
import { checkErrors } from 'request/methods/common';

// GET /v1/trials/lesson_classes
export const getTrialLessonClasses = async (): Promise<LessonClass[] | undefined> => {
  const res = await fetchApp(
    '/v1/trials/lesson_classes',
    'GET',
  )

  const response = checkErrors(res);
  if (!response) return;

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    return;
  }
};

// GET /v1/trials/lessons
export const getTrialLessons = async (): Promise<Lesson[] | undefined>  => {
  const res = await fetchApp(
    '/v1/trials/lessons',
    'GET',
  )

  const response = checkErrors(res);
  if (!response) return;

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    return;
  }
};

// POST /v1/trials
export const sendTrial = async (user: CreateTrialUserRequest, setSubmitFailed: Function) => {
  const res = await fetchApp(
    '/v1/trials',
    'POST',
    '',
    JSON.stringify({
      user,
    })
  )

  const response = checkErrors(res);
  if (!response) return;

  switch (response.status) {
    case 201:
      setSubmitFailed(false);
      break;
    case 400:
      setSubmitFailed(true);
      break;
    case 422:
      setSubmitFailed(true);
      break;
  }
};

// PUT /v1/trials
export const confirmTrial = async (token: string | null, setSubmitFailed: Function) => {
  if (!token) {
    return;
  }

  const res = await fetchApp(
    '/v1/trials',
    'PUT',
    '',
    JSON.stringify({
      user: {
        confirmation_token: token,
      },
    })
  )

  const response = checkErrors(res);
  if (!response) {
    setSubmitFailed(true);
    return
  };

  switch (response.status) {
    case 200:
      setSubmitFailed(false);
      break;
    case 400:
      setSubmitFailed(true);
      break;
    case 422:
      setSubmitFailed(true);
      break;
  }
};