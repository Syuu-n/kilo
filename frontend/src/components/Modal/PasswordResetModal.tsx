import * as React from 'react';
import { Modal } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar, VariantType } from 'notistack';

interface Props {
  open: boolean;
  closeFunc: any;
  email: string;
}

const PasswordResetModal: React.FC<Props> = (props) => {
  const { open, closeFunc, email } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const content = 
    <p>
      登録されているメールアドレスにパスワード変更のメールを送信します。<br/>
      メールからパスワード変更をおこなうとパスワードが変更できます。
    </p>;

  const showNotification = (message: string, variant?: VariantType) => {
    enqueueSnackbar(message, { variant });
    setTimeout(() => closeSnackbar(), 8000);
  }

  const handleSubmit = async () => {
    const res = await fetchApp(
      '/v1/passwords',
      'POST',
      '',
      JSON.stringify({
        user: {
          email: email,
        },
      })
    )
    if (res instanceof NetworkError) {
      console.log('NetworkError');
      showNotification('予期せぬエラーが発生しました。時間をおいて再度お試しください。', 'error');
      return
    }
    switch (res.status) {
      case 200:
        showNotification('パスワード再設定用のメールを送信しました。', 'success');
        break;
      default:
        showNotification('予期せぬエラーが発生しました。時間をおいて再度お試しください。', 'error');
    }
  }

  return (
    <Modal
      open={open}
      headerTitle="パスワード変更"
      content={content}
      submitText="変更"
      submitFunc={() => {handleSubmit()}}
      closeFunc={closeFunc}
    />
  );
};

export default PasswordResetModal;