require 'rails_helper'

describe 'Passwords API', type: :request do
  let(:json){ JSON.parse response.body }
  describe 'POST /api/v1/passwords' do
    subject { post '/api/v1/passwords', params: { user: { email: user_email } },
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

  describe 'PUT /api/v1/passwords' do
    subject { put '/api/v1/passwords', params: { user: update_params },
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
      it '422 Unprocessable Entity を返す' do
        subject

        expect(response.status).to eq 422
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
