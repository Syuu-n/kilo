import * as React from 'react';
import { Modal } from 'components';
import { sendPasswordReset } from 'request/methods/passwords';
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

  return (
    <Modal
      open={open}
      headerTitle="パスワード変更"
      content={content}
      submitText="変更"
      submitFunc={() => {sendPasswordReset(email, enqueueSnackbar)}}
      closeFunc={closeFunc}
    />
  );
};

export default PasswordResetModal;