import { fetchApp, NetworkError } from 'request/fetcher';
import { Plan } from 'responses/responseStructs';
import { CreatePlanRequest } from 'request/requestStructs';

// GET /v1/plans
export const getPlans = async (): Promise<Plan[] | undefined> => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }

  const res = await fetchApp(
    '/v1/plans',
    'GET',
    accessToken,
  )

  if (res instanceof NetworkError) {
    console.log("ServerError");
    return;
  }

  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    return;
  }
};

// POST /v1/plans
export const createPlan = async (plan: Plan | CreatePlanRequest, snackBar: Function, updateFunc?: Function) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }

  const res = await fetchApp(
    '/v1/plans',
    'POST',
    accessToken,
    JSON.stringify({
      plan,
    })
  )

  if (res instanceof NetworkError) {
    console.log("ServerError");
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }
  switch (res.status) {
    case 201:
      snackBar('コースの作成に成功しました。', { variant: 'success'});
      if (updateFunc) updateFunc();
      break;
    case 422:
      snackBar('コースの作成に失敗しました。内容を確かめてください。', { variant: 'error' });
      break;
    default:
      snackBar('コースの作成に失敗しました。', { variant: 'error' });
  }
};

// PATCH /v1/plans
export const updatePlan = async (plan: Plan | CreatePlanRequest, snackBar: Function, planID?: number, updateFunc?: Function) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }
  if (!planID) {
    return;
  }

  const res = await fetchApp(
    `/v1/plans/${planID}`,
    'PATCH',
    accessToken,
    JSON.stringify({
      plan,
    })
  )

  if (res instanceof NetworkError) {
    console.log("ServerError");
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }
  switch (res.status) {
    case 200:
      snackBar('コース情報の変更に成功しました。', { variant: 'success'});
      if (updateFunc) updateFunc();
      break;
    case 404:
      snackBar(`ID:${planID}のコースが存在しないため変更に失敗しました。`, { variant: 'error' });
      break;
    case 422:
      snackBar('コース情報の変更に失敗しました。内容を確かめてください。', { variant: 'error' });
      break;
    default:
      snackBar('コース情報の変更に失敗しました。', { variant: 'error' });
  }
};