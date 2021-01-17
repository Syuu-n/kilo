import { fetchApp, NetworkError } from 'request/fetcher';

type dataType = "users" | "lesson_classes" | "plans" | "lessons";

// DELETE /v1/{resourceName}
export const deleteResource = async (dataId: number, dataType: dataType, snackBar: Function, updateFunc?: Function) => {
  const accessToken = localStorage.getItem('kiloToken');
  if (!accessToken) {
    return;
  }

  const res = await fetchApp(
    `/v1/${dataType}/${dataId}`,
    'DELETE',
    accessToken
  )

  if (res instanceof NetworkError) {
    console.log("ServerError");
    snackBar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    return;
  }

  switch (res.status) {
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