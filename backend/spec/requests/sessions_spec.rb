require 'rails_helper'

describe 'Sessions API', type: :request do
  let(:admin_user) { find_admin_user }
  describe 'POST /v1/login' do
    let(:email){ admin_user.email }
    let(:password){ 'password' }
    subject { post '/v1/login', params: { email: email, password: password } }
    context 'メールアドレスとパスワードが正しい場合にログインできる' do
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        json = JSON.parse response.body
        expect(json['email']).to eq email
        expect(json['access_token']).to eq admin_user.access_token
      end
    end

    context 'メールアドレスが正しくない場合エラーする' do
      let(:email){ '' }
      let(:password){ 'password' }
      it '400 Bad Request を返す' do
        subject

        expect(response.status).to eq 400
        json = JSON.parse response.body
        expect(json['code']).to eq 'invalid_email_or_password'
      end
    end

    context 'パスワードが正しくない場合エラーする' do
      let(:email){ admin_user.email }
      let(:password){ '' }
      it '400 Bad Request を返す' do
        subject

        expect(response.status).to eq 400
        json = JSON.parse response.body
        expect(json['code']).to eq 'invalid_email_or_password'
      end
    end
  end
end
