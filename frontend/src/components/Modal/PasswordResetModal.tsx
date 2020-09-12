import * as React from 'react';
import { Modal } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { useSnackbar } from 'notistack';

interface Props {
  open: boolean;
  closeFunc: any;
  email: string;
}

const PasswordResetModal: React.FC<Props> = (props) => {
  const { open, closeFunc, email } = props;
  const { enqueueSnackbar } = useSnackbar();
  const content = 
    <p>
      登録されているメールアドレスにパスワード変更のメールを送信します。<br/>
      メールからパスワード変更をおこなうとパスワードが変更できます。
    </p>;

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
      enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
      return
    }
    switch (res.status) {
      case 200:
        enqueueSnackbar('パスワード再設定用のメールを送信しました。',  { variant: 'success' });
        break;
      default:
        enqueueSnackbar('予期せぬエラーが発生しました。時間をおいて再度お試しください。', { variant: 'error' });
    }
  }

  return (
    <Modal
      open={open}
      headerTitle="パスワード変更"
      content={content}
      submitText="変更"
      submitFunc={async () => {await handleSubmit()}}
      closeFunc={closeFunc}
    />
  );
};

export default PasswordResetModal;