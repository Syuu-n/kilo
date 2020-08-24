import * as React from 'react';
import { Modal, Snackbar } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';
import { MailOutline } from '@material-ui/icons';

interface Props {
  open: boolean;
  closeFunc: any;
  email: string;
}

const PasswordResetModal: React.FC<Props> = (props) => {
  const { open, closeFunc, email } = props;
  const [notification, setNotification] = React.useState(false);
  const content = 
    <p>
      登録されているメールアドレスにパスワード変更のメールを送信します。<br/>
      メールからパスワード変更をおこなうとパスワードが変更できます。
    </p>;

  const showNotification = () => {
    setNotification(true)
    setTimeout(() => setNotification(false), 8000);
  }

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('kiloToken');
    if (accessToken) {
      const res = await fetchApp(
        '/v1/passwords',
        'POST',
        accessToken,
        JSON.stringify({
          user: {
            email: email,
          },
        })
      )
      if (res instanceof NetworkError) {
        console.log('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
        return
      }
      switch (res.status) {
        case 200:
          console.log('送信しました。')
          showNotification()
          break;
        default:
          console.log('予期せぬエラーが発生しました。時間をおいて再度お試しください。');
      }
    } else {
      console.log('Access token not found')
      return
    }
  }

  return (
    <div>
      <Modal
        open={open}
        headerTitle="パスワード変更"
        content={content}
        submitText="変更"
        submitFunc={() => {handleSubmit()}}
        closeFunc={closeFunc}
      />
      <Snackbar
        place="br"
        color="success"
        message="パスワード再設定用のメールを送信しました。"
        icon={MailOutline}
        open={notification}
        closeNotification={() => setNotification(false)}
        close
      />
    </div>
  );
};

export default PasswordResetModal;