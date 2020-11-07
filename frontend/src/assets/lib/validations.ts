export interface ValidationReturn {
  value: string | number;
  error?: string;
}

export const nameValidation = (name:string) => {
  if (!name) return "必須項目です";
  if (name.length > 20) return "20文字以下で入力してください"
  return;
};

export const emailValidation = (email:string) => {
  if (!email) return "必須項目です";
  if (email.length > 191) return "191文字以下で入力してください";
  const regexp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!email.match(regexp)) return "正しい形式で入力してください";
  return;
};

export const passwordValidation = (password:string) => {
  if (!password) return "必須項目です";
  if (password.length < 6) return "パスワードは6文字以上で入力してください";
  if (password.length > 191) return "パスワードは191文字以下で入力してください";
  return;
};

export const birthdayValidation = (birthday:string) => {
  if (!birthday) return "必須項目です";
  const regexp = /[0-9]{8}/;
  if (!birthday.match(regexp)) return "正しい形式で入力してください";
  // 19970216 の形式で入力すると8文字となるため
  if (birthday.length > 8) return "正しい形式で入力してください";
  return;
};

export const phoneNumberValidation = (phoneNumber:string) => {
  if (!phoneNumber) return "必須項目です";
  return;
};

export const requireValidation = (value:string) => {
  if (!value) return "必須項目です";
  return;
};