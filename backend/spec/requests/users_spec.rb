require 'rails_helper'

describe 'Users API', type: :request do
  let(:json){ JSON.parse response.body }
  describe 'GET /v1/users' do
    subject { get '/v1/users', headers: { Authorization: access_token }  }
    context '管理者はユーザ一覧を取得できる' do
      login_admin
      let(:last_user){ User.last }
      let(:access_token){ admin.access_token }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json.is_a?(Array)).to eq true
        expect(json.last['id']).to eq last_user.id
        expect(json.last['email']).to eq last_user.email
        expect(json.last['name']).to eq last_user.name
        expect(json.last['name_kana']).to eq last_user.name_kana
        expect(json.last['birthday']).to eq last_user.birthday.to_s
        expect(json.last['phone_number']).to eq last_user.phone_number
        expect(json.last['plan_name']).to eq last_user.plan_name
      end
    end

    context 'ユーザはユーザ一覧を取得できない' do
      login_user
      let(:access_token){ user.access_token }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'POST /v1/users' do
    subject { post '/v1/users', params: { user: target_user }, headers: { Authorization: access_token } }
    let(:target_user){ {
      email: Faker::Internet.email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      first_name_kana: Faker::Ancient.god,
      last_name_kana: Faker::Creature::Animal.name,
      birthday: Time.current - rand(1..100).year,
      phone_number: Faker::PhoneNumber.cell_phone,
    } }
    context '管理者はユーザを作成できる' do
      login_admin
      let(:access_token){ admin.access_token }
      it '201 Created を返す' do
        subject

        expect(response.status).to eq 201
        new_user = User.last
        expect(json['email']).to eq new_user.email
        expect(json['name']).to eq new_user.name
        expect(json['name_kana']).to eq new_user.name_kana
        expect(json['birthday']).to eq new_user.birthday.to_s
        expect(json['phone_number']).to eq new_user.phone_number
        expect(json['plan_name']).to eq new_user.plan_name
      end
    end

    context '管理者は形式が正しくない場合ユーザを作成できない' do
      login_admin
      before do
        target_user[:email] = ''
      end
      let(:access_token){ admin.access_token }
      it '422 Unprocessable Entity を返す' do
        subject

        expect(response.status).to eq 422
        expect(json['code']).to eq 'user_create_error'
      end
    end

    context 'ユーザはユーザを作成できない' do
      login_user
      let(:access_token){ user.access_token }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end
end
