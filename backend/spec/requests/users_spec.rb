require 'rails_helper'

describe 'Users API', type: :request do
  let(:json){ JSON.parse response.body }
  describe 'GET /api/v1/users' do
    subject { get '/api/v1/users', headers: { Authorization: access_token }  }
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
        expect(json.last['first_name']).to eq last_user.first_name
        expect(json.last['last_name']).to eq last_user.last_name
        expect(json.last['first_name_kana']).to eq last_user.first_name_kana
        expect(json.last['last_name_kana']).to eq last_user.last_name_kana
        expect(json.last['age']).to eq last_user.age
        expect(json.last['birthday']).to eq last_user.birthday.to_s
        expect(json.last['phone_number']).to eq last_user.phone_number
        expect(json.last['role']['id']).to eq last_user.role.id
        expect(json.last['is_admin']).to eq last_user.is_admin?
        expect(json.last['current_monthly_count']).to eq last_user.current_monthly_count
        last_user_plan = last_user.plans.last
        json_last_user_plan = json.last['plans'].last
        if last_user_plan
          expect(json_last_user_plan['id']).to eq last_user_plan.id
          expect(json_last_user_plan['name']).to eq last_user_plan.name
          expect(json_last_user_plan['price']).to eq last_user_plan.price
        end
        last_user_lesson_class = last_user.user_lesson_classes.last
        json_last_user_lesson_class = json.last['user_lesson_classes'].last
        if last_user_lesson_class
          expect(json_last_user_lesson_class['id']).to eq last_user_lesson_class.id
          expect(json_last_user_lesson_class['name']).to eq last_user_lesson_class.name
          expect(json_last_user_lesson_class['price']).to eq last_user_lesson_class.price
          expect(json_last_user_lesson_class['description']).to eq last_user_lesson_class.description
          expect(json_last_user_lesson_class['color']).to eq last_user_lesson_class.color
          expect(json_last_user_lesson_class['for_children']).to eq last_user_lesson_class.for_children
          expect(json_last_user_lesson_class['location']).to eq last_user_lesson_class.location
          expect(json_last_user_lesson_class['user_limit_count']).to eq last_user_lesson_class.user_limit_count
        end
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

    context '体験ユーザがユーザ一覧を取得した場合' do
      login_trial_user
      let(:access_token){ trial_user.access_token }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'POST /api/v1/users' do
    subject { post '/api/v1/users', params: { user: target_user }, headers: { Authorization: access_token } }
    let(:target_user){ {
      email: Faker::Internet.email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      first_name_kana: Faker::Ancient.god,
      last_name_kana: Faker::Creature::Animal.name,
      birthday: Time.current - rand(1..100).year,
      phone_number: Faker::PhoneNumber.cell_phone,
      role_id: Role.normal.id,
      plan_ids: [Plan.default_plan.id],
    } }
    context '管理者がユーザを作成した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      it '201 Created を返す' do
        expect{subject}.to change{ User.count }.by(1)
        expect(response.status).to eq 201
        new_user = User.last
        expect(json['email']).to eq new_user.email
        expect(json['first_name']).to eq new_user.first_name
        expect(json['last_name']).to eq new_user.last_name
        expect(json['first_name_kana']).to eq new_user.first_name_kana
        expect(json['last_name_kana']).to eq new_user.last_name_kana
        expect(json['birthday']).to eq new_user.birthday.to_s
        expect(json['phone_number']).to eq new_user.phone_number
        expect(json['role']['id']).to eq new_user.role.id
        default_plan = Plan.default_plan
        expect(json['plans'].last['id']).to eq default_plan.id
        expect(json['plans'].last['name']).to eq default_plan.name
        expect(json['plans'].last['price']).to eq default_plan.price
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

    context '体験ユーザがユーザを作成した場合' do
      login_trial_user
      let(:access_token){ trial_user.access_token }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'PATCH /users/:id' do
    subject { patch "/api/v1/users/#{target_user_id}", params: { user: user_params }, headers: { Authorization: access_token }  }
    let(:user_params){ {
      email: Faker::Internet.email,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      first_name_kana: Faker::Ancient.god,
      last_name_kana: Faker::Creature::Animal.name,
      birthday: Time.current - rand(1..100).year,
      phone_number: Faker::PhoneNumber.cell_phone,
      role_id: Role.trial.id,
      plan_ids: [Plan.last.id],
    } }
    context '管理者がユーザ情報を変更した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json['email']).to eq user_params[:email]
        expect(json['first_name']).to eq user_params[:first_name]
        expect(json['last_name']).to eq user_params[:last_name]
        expect(json['first_name_kana']).to eq user_params[:first_name_kana]
        expect(json['last_name_kana']).to eq user_params[:last_name_kana]
        expect(json['phone_number']).to eq user_params[:phone_number]
        expect(json['role']['id']).to eq user_params[:role_id]
        expect(json['plans'].last['id']).to eq user_params[:plan_ids].last
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

    context 'ユーザが自身のユーザ情報を変更した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ user.id }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
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

    context '体験ユーザが自身のユーザ情報を変更した場合' do
      login_trial_user
      let(:access_token){ trial_user.access_token }
      let(:target_user_id){ trial_user.id }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end
  

  describe 'GET /users/:id' do
    subject { get "/api/v1/users/#{target_user_id}", headers: { Authorization: access_token }  }
    context '管理者が他のユーザの情報を取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_user = User.last
        expect(json['id']).to eq last_user.id
        expect(json['email']).to eq last_user.email
        expect(json['first_name']).to eq last_user.first_name
        expect(json['last_name']).to eq last_user.last_name
        expect(json['first_name_kana']).to eq last_user.first_name_kana
        expect(json['last_name_kana']).to eq last_user.last_name_kana
        expect(json['age']).to eq last_user.age
        expect(json['birthday']).to eq last_user.birthday.to_s
        expect(json['phone_number']).to eq last_user.phone_number
        expect(json['role']['id']).to eq last_user.role.id
        expect(json['is_admin']).to eq last_user.is_admin?
        expect(json['current_monthly_count']).to eq last_user.current_monthly_count
        last_user_plan = last_user.plans.last
        json_last_user_plan = json['plans'].last
        if last_user_plan
          expect(json_last_user_plan['id']).to eq last_user_plan.id
          expect(json_last_user_plan['name']).to eq last_user_plan.name
          expect(json_last_user_plan['price']).to eq last_user_plan.price
        end
        last_user_lesson_class = last_user.user_lesson_classes.last
        json_last_user_lesson_class = json['user_lesson_classes'].last
        if last_user_lesson_class
          expect(json_last_user_lesson_class['id']).to eq last_user_lesson_class.id
          expect(json_last_user_lesson_class['name']).to eq last_user_lesson_class.name
          expect(json_last_user_lesson_class['price']).to eq last_user_lesson_class.price
          expect(json_last_user_lesson_class['description']).to eq last_user_lesson_class.description
          expect(json_last_user_lesson_class['color']).to eq last_user_lesson_class.color
          expect(json_last_user_lesson_class['for_children']).to eq last_user_lesson_class.for_children
          expect(json_last_user_lesson_class['location']).to eq last_user_lesson_class.location
          expect(json_last_user_lesson_class['user_limit_count']).to eq last_user_lesson_class.user_limit_count
        end
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

    context 'ユーザが自身のユーザ情報を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ user.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_user = user
        expect(json['id']).to eq last_user.id
        expect(json['email']).to eq last_user.email
        expect(json['first_name']).to eq last_user.first_name
        expect(json['last_name']).to eq last_user.last_name
        expect(json['first_name_kana']).to eq last_user.first_name_kana
        expect(json['last_name_kana']).to eq last_user.last_name_kana
        expect(json['age']).to eq last_user.age
        expect(json['birthday']).to eq last_user.birthday.to_s
        expect(json['phone_number']).to eq last_user.phone_number
        expect(json['role']['id']).to eq last_user.role.id
        expect(json['is_admin']).to eq last_user.is_admin?
        expect(json['current_monthly_count']).to eq last_user.current_monthly_count
        last_user_plan = last_user.plans.last
        json_last_user_plan = json['plans'].last
        if last_user_plan
          expect(json_last_user_plan['id']).to eq last_user_plan.id
          expect(json_last_user_plan['name']).to eq last_user_plan.name
          expect(json_last_user_plan['price']).to eq last_user_plan.price
        end
        last_user_lesson_class = last_user.user_lesson_classes.last
        json_last_user_lesson_class = json['user_lesson_classes'].last
        if last_user_lesson_class
          expect(json_last_user_lesson_class['id']).to eq last_user_lesson_class.id
          expect(json_last_user_lesson_class['name']).to eq last_user_lesson_class.name
          expect(json_last_user_lesson_class['price']).to eq last_user_lesson_class.price
          expect(json_last_user_lesson_class['description']).to eq last_user_lesson_class.description
          expect(json_last_user_lesson_class['color']).to eq last_user_lesson_class.color
          expect(json_last_user_lesson_class['for_children']).to eq last_user_lesson_class.for_children
          expect(json_last_user_lesson_class['location']).to eq last_user_lesson_class.location
          expect(json_last_user_lesson_class['user_limit_count']).to eq last_user_lesson_class.user_limit_count
        end
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

    context '体験ユーザが自身のユーザ情報を取得した場合' do
      login_trial_user
      let(:access_token){ trial_user.access_token }
      let(:target_user_id){ trial_user.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_user = trial_user
        expect(json['id']).to eq last_user.id
        expect(json['email']).to eq last_user.email
        expect(json['first_name']).to eq last_user.first_name
        expect(json['last_name']).to eq last_user.last_name
        expect(json['first_name_kana']).to eq last_user.first_name_kana
        expect(json['last_name_kana']).to eq last_user.last_name_kana
        expect(json['age']).to eq last_user.age
        expect(json['birthday']).to eq last_user.birthday.to_s
        expect(json['phone_number']).to eq last_user.phone_number
        expect(json['role']['id']).to eq last_user.role.id
        expect(json['is_admin']).to eq last_user.is_admin?
        expect(json['current_monthly_count']).to eq last_user.current_monthly_count
        last_user_plan = last_user.plans.last
        json_last_user_plan = json['plans'].last
        if last_user_plan
          expect(json_last_user_plan['id']).to eq last_user_plan.id
          expect(json_last_user_plan['name']).to eq last_user_plan.name
          expect(json_last_user_plan['price']).to eq last_user_plan.price
        end
        last_user_lesson_class = last_user.user_lesson_classes.last
        json_last_user_lesson_class = json['user_lesson_classes'].last
        if last_user_lesson_class
          expect(json_last_user_lesson_class['id']).to eq last_user_lesson_class.id
          expect(json_last_user_lesson_class['name']).to eq last_user_lesson_class.name
          expect(json_last_user_lesson_class['price']).to eq last_user_lesson_class.price
          expect(json_last_user_lesson_class['description']).to eq last_user_lesson_class.description
          expect(json_last_user_lesson_class['color']).to eq last_user_lesson_class.color
          expect(json_last_user_lesson_class['for_children']).to eq last_user_lesson_class.for_children
          expect(json_last_user_lesson_class['location']).to eq last_user_lesson_class.location
          expect(json_last_user_lesson_class['user_limit_count']).to eq last_user_lesson_class.user_limit_count
        end
      end
    end
  end

  describe 'DELETE /users/:id' do
    subject { delete "/api/v1/users/#{target_user_id}", headers: { Authorization: access_token }  }
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

    context '存在しないユーザを削除した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:target_user_id){ User.last.id + 1 }
      it '404 NotFound を返す' do
        expect{subject}.to change{User.count}.by(0)
        expect(response.status).to eq 404
        expect(json['code']).to eq 'user_not_found'
      end
    end

    context 'ユーザがユーザを削除した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:target_user_id){ user.id }
      it '403 Forbidden を返す' do
        expect{subject}.to change{User.count}.by(0)
        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end

    context '体験ユーザがユーザを削除した場合' do
      login_trial_user
      let(:access_token){ trial_user.access_token }
      let(:target_user_id){ trial_user.id }
      it '403 Forbidden を返す' do
        expect{subject}.to change{User.count}.by(0)
        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end
end
