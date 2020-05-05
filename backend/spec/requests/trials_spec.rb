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
      phone_number: Faker::PhoneNumber.cell_phone
    } }
    context 'トライアル登録をおこなった場合' do
      it '200 OK を返す' do
        expect{subject}.to change{sent_emails.size}.by(1)
        expect(response.status).to eq 200
        expect(json['message']).to eq 'Trial request mail was sent.'

        expect(last_email.subject).to eq I18n.t('devise.mailer.confirmation_instructions.subject')
        expect(last_email.to).to eq [user_params[:email]]
        expect(last_email.from).to eq [Rails.application.credentials.gmail[:user_name]]
        encoded_body = last_email.body.encoded
        expect(encoded_body.include? I18n.t('devise.mailer.confirmation_instructions.title', name: user_params[:email])).to eq true
        expect(encoded_body.include? I18n.t('devise.mailer.confirmation_instructions.confirm_description')).to eq true
        expect(encoded_body.include? I18n.t('devise.mailer.confirmation_instructions.confirm_explanation')).to eq true
        expect(encoded_body.include? I18n.t('devise.mailer.confirmation_instructions.confirm_link')).to eq true
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
        phone_number: Faker::PhoneNumber.cell_phone
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
      end
      let(:trial_user){ create(:trial) }
      let(:confirmation_token){ @raw }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json['id']).to eq trial_user.id
        expect(json['email']).to eq trial_user.email
        expect(json['name']).to eq trial_user.name
        expect(json['name_kana']).to eq trial_user.name_kana
        expect(json['birthday']).to eq trial_user.birthday.to_s
        expect(json['phone_number']).to eq trial_user.phone_number
        expect(json['plan_name']).to eq trial_user.plan_name
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
end
