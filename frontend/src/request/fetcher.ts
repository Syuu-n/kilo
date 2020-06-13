const APP_BASE_URL = 'http://localhost:3001'

export function fetchApp(path: string, init?: RequestInit) {
  const res = fetch(`${APP_BASE_URL}` + path, init)
    .then(res => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    )
  return res;
}