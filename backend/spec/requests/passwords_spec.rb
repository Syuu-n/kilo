require 'rails_helper'

describe 'Passwords API', type: :request do
  let(:json){ JSON.parse response.body }
  describe 'POST /v1/passwords' do
    subject { post '/v1/passwords', params: { user: { email: user_email } },
                   headers: { Authorization: access_token }  }
    before(:each) do
      # メールリストを空にしておく
      reset_email
    end
    context 'パスワード再設定をおこなった場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:user_email){ user.email }
      it '200 OK を返す' do
        expect{subject}.to change{sent_emails.size}.by(1)
        expect(response.status).to eq 200
        expect(json['message']).to eq 'Password reset mail was sent.'

        expect(last_email.subject).to eq I18n.t('devise.mailer.reset_password_instructions.subject')
        expect(last_email.to).to eq [user.email]
        expect(last_email.from).to eq [Rails.application.credentials.gmail[:user_name]]
        encoded_body = last_email.body.encoded
        expect(encoded_body.include? I18n.t('devise.mailer.reset_password_instructions.title', name: user.email)).to eq true
        expect(encoded_body.include? I18n.t('devise.mailer.reset_password_instructions.reset_password_explanation')).to eq true
        expect(encoded_body.include? I18n.t('devise.mailer.reset_password_instructions.reset_password_link')).to eq true
        expect(encoded_body.include? I18n.t('devise.mailer.reset_password_instructions.please_ignore')).to eq true
        expect(encoded_body.include? I18n.t('devise.mailer.reset_password_instructions.wont_change')).to eq true
      end
    end

    context '送信先のメールアドレスが存在しない場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:user_email){ 'hogehogehogehogejjhgdsjkhaf@dajshsdiohjoaaaaa.in' }
      it '200 OK を返す' do
        expect{subject}.to change{sent_emails.size}.by(0)
        expect(response.status).to eq 200
        expect(json['message']).to eq 'Password reset mail was sent.'

        expect(last_email).to eq nil
      end
    end
  end

  describe 'PUT /v1/passwords' do
    subject { put '/v1/passwords', params: { user: update_params },
                   headers: { Authorization: access_token }  }
    before(:each) do
      reset_email
    end
    context 'メールからパスワードリセットをおこなった場合' do
      login_user
      before do
        @raw, enc = Devise.token_generator.generate(User, :reset_password_token)
        user.reset_password_token = enc
        user.reset_password_sent_at = Time.current
        user.save(validate: false)
      end
      let(:access_token){ user.access_token }
      let(:new_password){ Faker::Internet.password }
      let(:update_params){{
        password: new_password,
        password_confirmation: new_password,
        reset_password_token: @raw
      }}
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json['id']).to eq user.id
        expect(json['email']).to eq user.email
        expect(json['name']).to eq user.name
        expect(json['name_kana']).to eq user.name_kana
        expect(json['birthday']).to eq user.birthday.to_s
        expect(json['phone_number']).to eq user.phone_number
        expect(json['plan_name']).to eq user.plan_name
        user.reload
        expect(user.valid_password?(new_password)).to eq true
      end
    end

    context 'パスワードリセットをおこなったが新旧パスワードが合わない場合' do
      login_user
      before do
        @raw, enc = Devise.token_generator.generate(User, :reset_password_token)
        user.reset_password_token = enc
        user.reset_password_sent_at = Time.current
        user.save(validate: false)
      end
      let(:access_token){ user.access_token }
      let(:new_password){ Faker::Internet.password }
      let(:update_params){{
        password: new_password,
        password_confirmation: new_password + 'hoge',
        reset_password_token: @raw
      }}
      it '400 Bad Request を返す' do
        subject

        expect(response.status).to eq 400
        expect(json['code']).to eq 'password_not_match_error'
        user.reload
        expect(user.valid_password?(new_password)).to eq false
      end
    end

    context 'パスワードリセットをおこなったがトークンが正しくない場合' do
      login_user
      before do
        @raw, enc = Devise.token_generator.generate(User, :reset_password_token)
        user.reset_password_token = enc
        user.reset_password_sent_at = Time.current
        user.save(validate: false)
      end
      let(:access_token){ user.access_token }
      let(:new_password){ Faker::Internet.password }
      let(:update_params){{
        password: new_password,
        password_confirmation: new_password,
        reset_password_token: 'hoge'
      }}
      it '400 Bad Request を返す' do
        subject

        expect(response.status).to eq 400
        expect(json['code']).to eq 'password_reset_error'
        user.reload
        expect(user.valid_password?(new_password)).to eq false
      end
    end

    context 'パスワードリセットをおこなったがトークンの期限が切れている場合' do
      login_user
      before do
        @raw, enc = Devise.token_generator.generate(User, :reset_password_token)
        user.reset_password_token = enc
        user.reset_password_sent_at = Time.current
        user.save(validate: false)
      end
      let(:access_token){ user.access_token }
      let(:new_password){ Faker::Internet.password }
      let(:update_params){{
        password: new_password,
        password_confirmation: new_password,
        reset_password_token: @raw
      }}
      it '400 Bad Request を返す' do
        travel_to(Time.current + 10.hours) do
          subject

          expect(response.status).to eq 400
          expect(json['code']).to eq 'reset_password_token_expired_error'
          user.reload
          expect(user.valid_password?(new_password)).to eq false
        end
      end
    end
  end
end
