require 'rails_helper'

describe 'Users API', type: :request do
  let(:json){ JSON.parse response.body }
  describe 'GET /v1/users' do
    subject { get '/v1/users', headers: { Authorization: access_token }  }
    context '管理者がユーザ一覧を取得した場合' do
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

    context 'ユーザがユーザ一覧を取得した場合' do
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
    context '管理者がユーザを作成した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      it '201 Created を返す' do
        expect{subject}.to change{ User.count }.by(1)
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

    context '管理者が形式の正しくないユーザを作成した場合' do
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

    context 'ユーザがユーザを作成した場合' do
      login_user
      let(:access_token){ user.access_token }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'PATCH /users/:id' do
    subject { patch "/v1/users/#{target_user_id}", params: { user: user_params }, headers: { Authorization: access_token }  }
    let(:user_params){ {
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      first_name_kana: Faker::Ancient.god,
      last_name_kana: Faker::Creature::Animal.name,
      birthday: (Time.current - rand(1..100).year).strftime('%Y-%m-%d'),
      phone_number: Faker::PhoneNumber.cell_phone
    } }
    context '管理者はユーザ情報を変更した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json['name']).to eq user_params[:last_name] + " " + user_params[:first_name]
        expect(json['name_kana']).to eq user_params[:last_name_kana] + " " + user_params[:first_name_kana]
        expect(json['birthday']).to eq user_params[:birthday].to_s
        expect(json['phone_number']).to eq user_params[:phone_number]
      end
    end

    context 'ユーザは自身のユーザ情報を変更した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ user.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json['name']).to eq user_params[:last_name] + " " + user_params[:first_name]
        expect(json['name_kana']).to eq user_params[:last_name_kana] + " " + user_params[:first_name_kana]
        expect(json['birthday']).to eq user_params[:birthday].to_s
        expect(json['phone_number']).to eq user_params[:phone_number]
      end
    end

    context '存在しないユーザ情報を変更した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id + 1 }
      it '404 NotFound を返す' do
        subject

        expect(response.status).to eq 404
        expect(json['code']).to eq 'user_not_found'
      end
    end

    context 'ユーザが他のユーザ情報を変更した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ User.first.id }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end

    context '形式の正しくない情報でユーザを編集した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:user_params){ { first_name: nil } }
      let(:target_user_id){ User.last.id }
      it '422 Unprocessable Entity を返す' do
        subject

        expect(response.status).to eq 422
        expect(json['code']).to eq 'user_update_error'
      end
    end
  end

  describe 'GET /users/:id' do
    subject { get "/v1/users/#{target_user_id}", headers: { Authorization: access_token }  }
    context '管理者が他のユーザの情報を取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_user = User.last
        expect(json['email']).to eq last_user.email
        expect(json['name']).to eq last_user.name
        expect(json['name_kana']).to eq last_user.name_kana
        expect(json['birthday']).to eq last_user.birthday.to_s
        expect(json['phone_number']).to eq last_user.phone_number
        expect(json['plan_name']).to eq last_user.plan_name
      end
    end

    context 'ユーザが自身のユーザ情報を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ user.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json['email']).to eq user.email
        expect(json['name']).to eq user.name
        expect(json['name_kana']).to eq user.name_kana
        expect(json['birthday']).to eq user.birthday.to_s
        expect(json['phone_number']).to eq user.phone_number
        expect(json['plan_name']).to eq user.plan_name
      end
    end

    context '存在しないユーザ情報を取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id + 1 }
      it '404 NotFound を返す' do
        subject

        expect(response.status).to eq 404
        expect(json['code']).to eq 'user_not_found'
      end
    end

    context 'ユーザが他のユーザ情報を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ User.first.id }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'DELETE /users/:id' do
    subject { delete "/v1/users/#{target_user_id}", headers: { Authorization: access_token }  }
    context '管理者が他のユーザを削除した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id }
      it '200 OK を返す' do
        expect{subject}.to change{ User.count }.by(-1)
        expect(response.status).to eq 200
        expect(json['message']).to eq 'User deleted.'
      end
    end

    context 'ユーザがユーザを削除した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ user.id }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end

    context '存在しないユーザを削除した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id + 1 }
      it '404 NotFound を返す' do
        subject

        expect(response.status).to eq 404
        expect(json['code']).to eq 'user_not_found'
      end
    end
  end

  describe 'GET /users/:id/lessons' do
    subject { get "/v1/users/#{target_user_id}/lessons", headers: { Authorization: access_token }  }
    context '管理者が他のユーザのレッスン情報を取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_lesson = User.last.lessons.first
        if last_lesson
          expect(json.last['id']).to eq last_lesson.id
          expect(json.last['lesson_class_name']).to eq last_lesson.lesson_class.name
          expect(json.last['start_at']).to eq last_lesson.start_at
          expect(json.last['end_at']).to eq last_lesson.end_at
          expect(json.last['users'].include? User.last).to eq true
        else
          expect(json).to eq []
        end
      end
    end

    context 'ユーザが自身のレッスン情報を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ user.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_lesson = user.lessons.first
        if last_lesson
          expect(json.last['id']).to eq last_lesson.id
          expect(json.last['lesson_class_name']).to eq last_lesson.lesson_class.name
          expect(json.last['start_at']).to eq last_lesson.start_at
          expect(json.last['end_at']).to eq last_lesson.end_at
        else
          expect(json).to eq []
        end
      end
    end

    context '存在しないユーザのレッスン情報を取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id + 1 }
      it '404 NotFound を返す' do
        subject

        expect(response.status).to eq 404
        expect(json['code']).to eq 'user_not_found'
      end
    end

    context 'ユーザが他のユーザのレッスン情報を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ User.first.id }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'GET /users/:id/plan' do
    subject { get "/v1/users/#{target_user_id}/plan", headers: { Authorization: access_token }  }
    context '管理者が他のユーザのプラン情報を取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        user_plan = User.last.plan
        expect(json['id']).to eq user_plan.id
        expect(json['name']).to eq user_plan.name
        expect(json['price']).to eq user_plan.price
        expect(json['monthly_lesson_count']).to eq user_plan.monthly_lesson_count
        expect(json['for_children']).to eq user_plan.for_children
      end
    end

    context 'ユーザが自身のプラン情報を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ user.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        user_plan = user.plan
        expect(json['id']).to eq user_plan.id
        expect(json['name']).to eq user_plan.name
        expect(json['price']).to eq user_plan.price
        expect(json['monthly_lesson_count']).to eq user_plan.monthly_lesson_count
        expect(json['for_children']).to eq user_plan.for_children
      end
    end

    context '存在しないユーザのプラン情報を取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id + 1 }
      it '404 NotFound を返す' do
        subject

        expect(response.status).to eq 404
        expect(json['code']).to eq 'user_not_found'
      end
    end

    context 'ユーザが他のユーザのプラン情報を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ User.first.id }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end
end
