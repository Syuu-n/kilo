// API のベース URL
const APP_BASE_URL = 'http://localhost:3001'

// ネットワークエラー
export class NetworkError {
  public readonly isError = true;
}

function handleNetworkError(error: Error): NetworkError {
  if (error instanceof TypeError) {
    return new NetworkError();
  }
  throw error;
}

export async function fetchApp(path:string, method:string='GET', token?:string, body?:RequestInit['body']) {
  const requestHeader = token ?
    new Headers({ 'Content-Type': 'application/json', 'Authorization': token }) :
    new Headers({ 'Content-Type': 'application/json'})

  const res = await fetch(
    `${APP_BASE_URL}` + path,
    {
      method: method,
      headers: requestHeader,
      body: body
    }
  ).catch(handleNetworkError);

  return res;
};