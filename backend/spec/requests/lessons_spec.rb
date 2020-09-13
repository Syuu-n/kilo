require 'rails_helper'

describe 'Lessons API', type: :request do
  let(:json){ JSON.parse response.body }
  describe 'GET /v1/lessons' do
    subject { get '/v1/lessons', headers: { Authorization: access_token }  }
    context '管理者がレッスン一覧を取得した場合' do
      login_admin
      let(:last_lesson){ Lesson.last }
      let(:access_token){ admin.access_token }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json.is_a?(Array)).to eq true
        expect(json.last['id']).to eq last_lesson.id
        expect(json.last['class_name']).to eq last_lesson.lesson_class.name
        expect(Time.zone.parse(json.last['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json.last['end_at'])).to eq last_lesson.end_at
        last_user = last_lesson.users.last
        if last_user
          expect(json.last['users'].last['id']).to eq last_user.id
          expect(json.last['users'].last['name']).to eq last_user.name
          expect(json.last['users'].last['name_kana']).to eq last_user.name_kana
          expect(json.last['users'].last['birthday']).to eq last_user.birthday.to_s
          expect(json.last['users'].last['phone_number']).to eq last_user.phone_number
        else
          expect(json.last['users']).to eq []
        end
      end
    end

    context 'ユーザがレッスン一覧を取得した場合' do
      login_user
      let(:last_lesson){ Lesson.last }
      let(:access_token){ user.access_token }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json.is_a?(Array)).to eq true
        expect(json.last['id']).to eq last_lesson.id
        expect(json.last['class_name']).to eq last_lesson.lesson_class.name
        expect(Time.zone.parse(json.last['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json.last['end_at'])).to eq last_lesson.end_at
      end
    end
  end

  describe 'POST /v1/lessons' do
    subject { post '/v1/lessons', params: { lesson: lesson_params }, headers: { Authorization: access_token } }
    let(:lesson_params){ {
      lesson_class_id: rand(1..3),
      start_at: Time.current,
      end_at: Time.current + 1.hours
    } }
    context '管理者がレッスンを作成した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      it '201 Created を返す' do
        expect{subject}.to change{ Lesson.count }.by(1)
        expect(response.status).to eq 201
        new_lesson = Lesson.last
        expect(json['class_name']).to eq new_lesson.class_name
        expect(Time.zone.parse(json['start_at'])).to eq new_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq new_lesson.end_at
      end
    end

    context '管理者が形式の正しくないレッスンを作成した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:lesson_params){ { start_at: nil } }
      it '422 Unprocessable Entity を返す' do
        expect{subject}.to change{ Lesson.count }.by(0)
        expect(response.status).to eq 422
        expect(json['code']).to eq 'lesson_create_error'
      end
    end

    context 'ユーザがレッスンを作成した場合' do
      login_user
      let(:access_token){ user.access_token }
      it '403 Forbidden を返す' do
        expect{subject}.to change{ Lesson.count }.by(0)
        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'PATCH /v1/lessons/:id' do
    subject { patch "/v1/lessons/#{lesson_id}", params: { lesson: lesson_params }, headers: { Authorization: access_token } }
    let(:lesson_params){ {
      lesson_class_id: rand(1..3),
      start_at: Time.current,
      end_at: Time.current + 1.hours
    } }
    context '管理者がレッスン情報を変更した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_lesson = Lesson.last
        expect(json['class_name']).to eq last_lesson.class_name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
      end
    end

    context '管理者が形式の正しくないレッスン情報へ変更した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:lesson_params){ { start_at: nil } }
      let(:lesson_id){ Lesson.last.id }
      it '422 Unprocessable Entity を返す' do
        subject

        expect(response.status).to eq 422
        expect(json['code']).to eq 'lesson_update_error'
      end
    end

    context 'ユーザがレッスンを変更した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'GET /v1/lessons/:id' do
    subject { get "/v1/lessons/#{lesson_id}", headers: { Authorization: access_token } }
    context '管理者が指定したレッスンを取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_lesson = Lesson.last
        expect(json['class_name']).to eq last_lesson.class_name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
      end
    end

    context 'ユーザが指定したレッスンを取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_lesson = Lesson.last
        expect(json['class_name']).to eq last_lesson.class_name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
      end
    end

    context '存在しないレッスンを取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:lesson_id){ Lesson.last.id + 1 }
      it '404 Not Found を返す' do
        subject

        expect(response.status).to eq 404
        expect(json['code']).to eq 'lesson_not_found'
      end
    end
  end

  describe 'DELETE /v1/lessons/:id' do
    subject { delete "/v1/lessons/#{lesson_id}", headers: { Authorization: access_token } }
    context '管理者が指定したレッスンを削除した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '200 OK を返す' do
        expect{subject}.to change{Lesson.count}.by(-1)
        expect(response.status).to eq 200
        expect(json['message']).to eq 'Lesson deleted.'
      end
    end

    context 'ユーザが指定したレッスンを削除した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '403 Forbidden を返す' do
        expect{subject}.to change{Lesson.count}.by(0)
        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end

    context '存在しないレッスンを削除した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:lesson_id){ Lesson.last.id + 1 }
      it '404 Not Found を返す' do
        expect{subject}.to change{Lesson.count}.by(0)
        expect(response.status).to eq 404
        expect(json['code']).to eq 'lesson_not_found'
      end
    end

    describe 'POST /users/:id/join' do
      subject { post "/v1/lessons/#{lesson_id}/join", headers: { Authorization: access_token } }
      before do
        Lesson.last.user_lessons.each do |ul|
          ul.destroy
        end
      end
      context '管理者が指定したレッスンに参加した場合' do
        login_admin
        let(:access_token){ admin.access_token }
        let(:lesson_id){ Lesson.last.id }
        it '200 OK を返す' do
          expect{subject}.to change{UserLesson.count}.by(1)
          expect(response.status).to eq 200
          expect(json['message']).to eq 'User join success.'
        end
      end

      context 'ユーザが指定したレッスンに参加した場合' do
        login_user
        let(:access_token){ user.access_token }
        let(:lesson_id){ Lesson.last.id }
        it '200 OK を返す' do
          expect{subject}.to change{UserLesson.count}.by(1)
          expect(response.status).to eq 200
          expect(json['message']).to eq 'User join success.'
        end
      end

      context '存在しないレッスンへ参加した場合' do
        login_admin
        let(:access_token){ admin.access_token }
        let(:lesson_id){ Lesson.last.id + 1 }
        it '404 Not Found を返す' do
          expect{subject}.to change{UserLesson.count}.by(0)
          expect(response.status).to eq 404
          expect(json['code']).to eq 'lesson_not_found'
        end
      end

      context '既に参加しているレッスンへ参加した場合' do
        login_admin
        before do
          Lesson.last.join(admin)
        end
        let(:access_token){ admin.access_token }
        let(:lesson_id){ Lesson.last.id }
        it '400 Bad Request を返す' do
          expect{subject}.to change{UserLesson.count}.by(0)
          expect(response.status).to eq 400
          expect(json['code']).to eq 'user_already_joined'
        end
      end

      context '今月の残り回数がない状態で参加した場合' do
        login_admin
        before do
          admin.plan = Plan.last
          admin.save!
        end
        let(:access_token){ admin.access_token }
        let(:lesson_id){ Lesson.last.id }
        it '400 Bad Request を返す' do
          expect{subject}.to change{UserLesson.count}.by(0)
          expect(response.status).to eq 400
          expect(json['code']).to eq 'user_monthly_limit_error'
        end
      end
    end

    describe 'POST /users/:id/leave' do
      subject { delete "/v1/lessons/#{lesson_id}/leave", headers: { Authorization: access_token } }
      before do
        Lesson.last.user_lessons.each do |ul|
          ul.destroy
        end
      end
      context '管理者が指定したレッスンから辞退した場合' do
        before do
          Lesson.last.join(admin)
        end
        login_admin
        let(:access_token){ admin.access_token }
        let(:lesson_id){ Lesson.last.id }
        it '200 OK を返す' do
          expect{subject}.to change{UserLesson.count}.by(-1)
          expect(response.status).to eq 200
          expect(json['message']).to eq 'User leave success.'
        end
      end

      context 'ユーザが指定したレッスンから辞退した場合' do
        before do
          Lesson.last.join(user)
        end
        login_user
        let(:access_token){ user.access_token }
        let(:lesson_id){ Lesson.last.id }
        it '200 OK を返す' do
          expect{subject}.to change{UserLesson.count}.by(-1)
          expect(response.status).to eq 200
          expect(json['message']).to eq 'User leave success.'
        end
      end

      context '存在しないレッスンから辞退した場合' do
        login_admin
        let(:access_token){ admin.access_token }
        let(:lesson_id){ Lesson.last.id + 1 }
        it '404 Not Found を返す' do
          expect{subject}.to change{UserLesson.count}.by(0)
          expect(response.status).to eq 404
          expect(json['code']).to eq 'lesson_not_found'
        end
      end

      context '参加していないレッスンから辞退した場合' do
        login_admin
        let(:access_token){ admin.access_token }
        let(:lesson_id){ Lesson.last.id }
        it '400 Bad Request を返す' do
          expect{subject}.to change{UserLesson.count}.by(0)
          expect(response.status).to eq 400
          expect(json['code']).to eq 'user_not_joined'
        end
      end
    end
  end
end
