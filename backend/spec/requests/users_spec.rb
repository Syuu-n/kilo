require 'rails_helper'

describe 'Users API', type: :request do
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
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        json = JSON.parse response.body
        new_user = User.last
        expect(json['email']).to eq new_user.email
        expect(json['access_token']).to eq new_user.access_token
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
        json = JSON.parse response.body
        expect(json['code']).to eq 'user_create_error'
      end
    end

    context 'ユーザはユーザを作成できない' do
      login_user
      let(:access_token){ user.access_token }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        json = JSON.parse response.body
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end
end
