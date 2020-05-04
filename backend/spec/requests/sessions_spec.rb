require 'rails_helper'

describe 'Sessions API', type: :request do
  let(:admin) { create(:admin) }
  let(:json){ JSON.parse response.body }
  describe 'POST /v1/login' do
    let(:email){ admin.email }
    let(:password){ 'password' }
    subject { post '/v1/login', params: { email: email, password: password } }
    context '正しいメールアドレスとパスワードでログインした場合' do
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json['access_token']).to eq admin.access_token
        expect(Time.zone.parse(json['access_token_expire'])).to eq admin.access_token_expire
      end
    end

    context '不正なメールアドレスでログインした場合' do
      let(:email){ '' }
      it '400 Bad Request を返す' do
        subject

        expect(response.status).to eq 400
        expect(json['code']).to eq 'invalid_email_or_password'
      end
    end

    context '不正なパスワードでログインした場合' do
      let(:password){ '' }
      it '400 Bad Request を返す' do
        subject

        expect(response.status).to eq 400
        expect(json['code']).to eq 'invalid_email_or_password'
      end
    end

    context 'アクセストークンの有効期限が切れているユーザがログインした場合' do
      let!(:before_access_token){ admin.access_token }
      let!(:before_access_token_expire){ admin.access_token_expire }
      it 'アクセストークンを更新し 200 OK を返す' do
        travel_to(Time.current + 15.days) do
          subject

          expect(response.status).to eq 200
          expect(json['access_token']).not_to eq before_access_token
          expect(json['access_token_expire']).not_to eq before_access_token_expire
        end
      end
    end
  end

  describe 'Auth API' do
    subject { get "/v1/users/#{user.id}", headers: { Authorization: access_token } }
    let(:user){ create(:user) }
    let(:access_token){ user.access_token }
    context 'アクセストークンが正しくかつ期限が切れていない場合' do
      it 'API を利用できる' do
        subject

        expect(response.status).to eq 200
      end
    end

    context 'アクセストークンが正しくない場合' do
      let(:access_token){ 'hogehogehoge' }
      it 'API を利用できない' do
        subject

        expect(response.status).to eq 401
        expect(json['code']).to eq 'unauthenticated'
      end
    end

    context 'アクセストークンの期限が切れている場合' do
      it 'API を利用できない' do
        user
        travel_to(Time.current + 15.days) do
          subject

          expect(response.status).to eq 403
          expect(json['code']).to eq 'access_token_expired'
        end
      end
    end
  end
end
