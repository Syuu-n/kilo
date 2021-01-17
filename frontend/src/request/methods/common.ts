import { fetchApp, NetworkError } from 'request/fetcher';
import history from 'RouterHistory';

type dataType = "users" | "lesson_classes" | "plans" | "lessons";

// アクセストークンを取得する
export const getAccessToken = (): string | null => {
  const accessToken = localStorage.getItem('kiloToken');
  return accessToken;
};

export const checkErrors = (res: Response | NetworkError, snackBar?: Function) => {
  if (res instanceof NetworkError) {
    console.log("ServerError");
    if (snackBar) snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }
  if (res.status == 401) {
    if (snackBar) snackBar('この操作にはログインが必要です。', { variant: 'error' });
    return;
  }
  if (res.status == 403) {
    history.push('/login');
    return;
  }
  return res;
};

// DELETE /v1/{resourceName}
export const deleteResource = async (dataId: number, dataType: dataType, snackBar: Function, updateFunc?: Function) => {
  const accessToken = getAccessToken();
  if (!accessToken) return;

  const res = await fetchApp(
    `/v1/${dataType}/${dataId}`,
    'DELETE',
    accessToken
  )
  
  const response = checkErrors(res, snackBar);
  if (!response) return;

  switch (response.status) {
    case 200:
      snackBar(`種類:${dataType} ID:${dataId}の削除に成功しました。`, { variant: 'success' });
      if (updateFunc) updateFunc();
      break;
    case 404:
      snackBar(`種類:${dataType} ID:${dataId}が存在しないため削除に失敗しました。`, { variant: 'error' });
      break;
    case 400:
      snackBar(`種類:${dataType} ID:${dataId}の削除に失敗しました。`, { variant: 'error' });
      break;
  }
};