require 'rails_helper'

describe 'Users API', type: :request do
  describe 'POST /v1/users' do
    subject { post '/v1/users', params: { user: user } }
    context '管理者はユーザを作成できる' do
      login_admin
      let(:user){ {
        email: Faker::Internet.email,
        password: 'password',
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        first_name_kana: Faker::Ancient.god,
        last_name_kana: Faker::Creature::Animal.name,
        birthday: Time.current - rand(1..100).year,
        phone_number: Faker::PhoneNumber.cell_phone,
      } }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        json = JSON.parse response.body
        new_user = User.last
        expect(json['email']).to eq new_user.email
        expect(json['access_token']).to eq new_user.access_token
      end
    end
  end
end
