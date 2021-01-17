import { fetchApp, NetworkError } from 'request/fetcher';
import { CreateUserRequest } from 'request/requestStructs';
import { User } from 'responses/responseStructs';

// GET /v1/users
export const getUsers = async (): Promise<User[] | undefined> => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }

  const res = await fetchApp(
    '/v1/users',
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

// POST /v1/users
export const createUser = async (user: CreateUserRequest | User, snackBar: Function, updateFunc?: Function) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }

  const res = await fetchApp(
    '/v1/users',
    'POST',
    accessToken,
    JSON.stringify({
      user,
    })
  )

  if (res instanceof NetworkError) {
    console.log("ServerError");
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }

  switch (res.status) {
    case 201:
      snackBar('ユーザーの作成に成功しました。', { variant: 'success'});
      if (updateFunc) updateFunc();
      break;
    case 400:
      snackBar('既に使用されているメールアドレスです。', { variant: 'error' });
      break; 
    case 422:
      snackBar('ユーザーの作成に失敗しました。内容を確かめてください。', { variant: 'error' });
      break;
  }
};

// PATCH /v1/users/:id
export const updateUser = async (user: CreateUserRequest | User, snackBar: Function, userID?: number, updateFunc?: Function) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }
  if (!userID) {
    return;
  }

  // 更新処理の場合は User オブジェクトから password を削除する
  delete user?.password

  const res = await fetchApp(
    `/v1/users/${userID}`,
    'PATCH',
    accessToken,
    JSON.stringify({
      user,
    })
  )

  if (res instanceof NetworkError) {
    console.log("ServerError");
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }

  switch (res.status) {
    case 200:
      snackBar('ユーザー情報の変更に成功しました。', { variant: 'success'});
      if (updateFunc) updateFunc();
      break;
    case 404:
      snackBar(`ID:${userID}のユーザが存在しないため変更に失敗しました。`, { variant: 'error' });
      break;
    case 422:
      snackBar('ユーザー情報の変更に失敗しました。内容を確かめてください。', { variant: 'error' });
      break;
  }
};