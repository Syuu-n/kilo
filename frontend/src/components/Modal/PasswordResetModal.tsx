import * as React from 'react';
import { Modal } from 'components';
import { fetchApp, NetworkError } from 'request/fetcher';

interface Props {
  open: boolean;
  closeFunc: any;
  email: string;
}

const PasswordResetModal: React.FC<Props> = (props) => {
  const { open, closeFunc, email } = props;
  const content = 
    <p>
      登録されているメールアドレスにパスワード変更のメールを送信します。<br/>
      メールからパスワード変更をおこなうとパスワードが変更できます。
    </p>;

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