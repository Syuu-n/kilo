import * as React from 'react';
import { Modal } from 'components';
import { fetchApp } from 'request/fetcher';
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

  const handleSubmit = () => {
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
    enqueueSnackbar('パスワード再設定用のメールを送信しました。',  { variant: 'success' });
  };

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