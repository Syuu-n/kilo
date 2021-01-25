require 'rails_helper'

describe 'Trials API', type: :request do
  let(:json){ JSON.parse response.body }
  describe 'POST /v1/trials' do
    subject { post '/v1/trials', params: { user: user_params } }
    before(:each) do
      # メールリストを空にしておく
      reset_email
    end
    let(:user_params){ {
      email: Faker::Internet.email,
      password: Faker::Internet.password,
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      first_name_kana: Faker::Ancient.god,
      last_name_kana: Faker::Creature::Animal.name,
      birthday: (Time.current - rand(1..100).year),
      phone_number: Faker::PhoneNumber.cell_phone,
      lesson_id: Lesson.first.id,
    } }
    context 'トライアル登録をおこなった場合' do
      it '201 OK を返す' do
        expect{subject}.to change{sent_emails.size}.by(1)
        expect(response.status).to eq 201
        expect(json['message']).to eq 'Trial request mail was sent.'

        expect(last_email.subject).to eq I18n.t('devise.mailer.confirmation_instructions.subject')
        expect(last_email.to).to eq [user_params[:email]]
        expect(last_email.from).to eq [Rails.application.credentials.gmail[:user_name]]
      end
    end

    context '既に使われれいるメールアドレスでトライアル登録をおこなった場合' do
      let(:user_params){ {
        email: User.first.email,
        password: Faker::Internet.password,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        first_name_kana: Faker::Ancient.god,
        last_name_kana: Faker::Creature::Animal.name,
        birthday: (Time.current - rand(1..100).year),
        phone_number: Faker::PhoneNumber.cell_phone,
        lesson_id: Lesson.first.id,
      } }
      it '400 Bad Request を返す' do
        expect{subject}.to change{sent_emails.size}.by(0)
        expect(response.status).to eq 400
        expect(json['code']).to eq 'email_already_exists_error'
      end
    end

    context '正しくないユーザ情報でトライアル登録をおこなった場合' do
      let(:user_params){{ email: nil }}
      it '422 Unprocessable Entity を返す' do
        expect{subject}.to change{sent_emails.size}.by(0)
        expect(response.status).to eq 422
        expect(json['code']).to eq 'trial_request_create_error'
      end
    end
  end

  describe 'PUT /v1/trials' do
    subject { put '/v1/trials', params: { user: { confirmation_token: confirmation_token } } }
    before(:each) do
      reset_email
    end
    context 'メールから本人確認をおこなった場合' do
      before do
        @raw, _ = Devise.token_generator.generate(User, :confirmation_token)
        trial_user.confirmation_token = @raw
        trial_user.confirmation_sent_at = Time.current
        trial_user.save(validate: false)
        lesson.join(trial_user)
      end
      let(:trial_user){ create(:unconfirmed_trial) }
      let(:confirmation_token){ @raw }
      let(:lesson){ Lesson.first }
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
        trial_user.reload
        expect(trial_user.confirmed?).to eq true
      end
    end

    context 'メールから本人確認をおこなったがトークンが正しくない場合' do
      before do
        @raw, _ = Devise.token_generator.generate(User, :confirmation_token)
        user.confirmation_token = @raw
        user.confirmation_sent_at = Time.current
        user.save(validate: false)
      end
      let(:user){ create(:user) }
      let(:confirmation_token){ '' }
      it '400 Bad Request を返す' do
        subject

        expect(response.status).to eq 400
        expect(json['code']).to eq 'invalid_confirmation_token_error'
      end
    end

    context '既に本人確認済みのユーザがメールから本人確認をおこなった場合' do
      before do
        @raw, _ = Devise.token_generator.generate(User, :confirmation_token)
        user.confirmation_token = @raw
        user.confirmation_sent_at = Time.current
        user.save(validate: false)
      end
      let(:user){ create(:user) }
      let(:confirmation_token){ @raw }
      it '400 Bad Request を返す' do
        subject

        expect(response.status).to eq 400
        expect(json['code']).to eq 'user_already_confirmed_error'
      end
    end
  end

  describe 'GET /v1/trials/lesson_classes' do
    subject { get '/v1/trials/lesson_classes' }
    let(:lesson_classes){ Plan.trial_plan.lesson_classes }
    context '体験コースで参加できるクラス一覧を取得した場合' do
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json.last['id']).to eq lesson_classes.last.id
      end
    end
  end

  describe 'GET /v1/trials/lessons' do
    subject { get '/v1/trials/lessons' }
    let(:range){ Time.current.next_day.beginning_of_day..Time.current.next_month.end_of_month }
    let(:raw_lessons){ Lesson.where(start_at: range, lesson_class: Plan.trial_plan.lesson_classes) }
    let(:lessons){ raw_lessons.filter{|lesson| lesson.remaining_user_count > 0} }
    context '体験コースで参加できるレッスン一覧を取得した場合' do
      it '200 OK を返す' do
        subject
        
        expect(response.status).to eq 200
        expect(json.last['id']).to eq lessons.last.id
      end
    end
  end
end
