import { fetchApp, NetworkError } from 'request/fetcher';

// POST /v1/passwords
export const sendPasswordReset = (email: string, snackBar?: Function) => {
  // NOTE: メール送信はセキュリティの都合で失敗しても通知しない
  fetchApp(
    '/v1/passwords',
    'POST',
    '',
    JSON.stringify({
      user: {
        email: email,
      },
    })
  )
  if (snackBar) {
    snackBar('パスワード再設定用のメールを送信しました。',  { variant: 'success' });
  };
};

// PUT /v1/passwords
export const confirmPasswordReset = async (newPassword: string, newPasswordConfirm: string, token: string, setErrorMessage: Function, setButtonDisabled: Function, setOpenCompletePage: Function) => {
  const res = await fetchApp(
    '/v1/passwords',
    'PUT',
    '',
    JSON.stringify({
      user: {
        password: newPassword,
        password_confirmation: newPasswordConfirm,
        reset_password_token: token
      }
    })
  )
  if (res instanceof NetworkError) {
    setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
    setButtonDisabled(false);
    return
  }

  const json = await res.json();
  switch (res.status) {
    case 200:
      setOpenCompletePage(true);
      break
    case 400:
      switch (json.code) {
        case 'reset_password_token_expired_error':
          setErrorMessage('既にパスワードが変更されているため無効な操作です。');
          setButtonDisabled(false);
          break
        case 'password_reset_error':
          setErrorMessage('パスワードの変更に失敗しました。');
          setButtonDisabled(false);
          break
        default:
          setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
          setButtonDisabled(false);
      }
      break
    case 422:
      setErrorMessage('パスワードが一致しません。');
      setButtonDisabled(false);
      break
    default:
      setErrorMessage('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
      setButtonDisabled(false);
      break
  }
};