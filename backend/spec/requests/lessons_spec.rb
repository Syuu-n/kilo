require 'rails_helper'

describe 'Lessons API', type: :request do
  let(:json){ JSON.parse response.body }
  describe 'GET /v1/lessons' do
    subject { get '/v1/lessons', headers: { Authorization: access_token }  }
    context '管理者がレッスン一覧を取得した場合' do
      login_admin
      let(:last_lesson){ Lesson.where(start_at: Time.current.beginning_of_year..Time.current.end_of_year).last }
      let(:access_token){ admin.access_token }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json.is_a?(Array)).to eq true
        expect(json.last['id']).to eq last_lesson.id
        expect(json.last['name']).to eq last_lesson.name
        expect(Time.zone.parse(json.last['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json.last['end_at'])).to eq last_lesson.end_at
        expect(json.last['color']).to eq last_lesson.color
        expect(json.last['description']).to eq last_lesson.description
        expect(json.last['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json.last['location']).to eq last_lesson.location
        expect(json.last['price']).to eq last_lesson.price
        expect(json.last['for_children']).to eq last_lesson.for_children
        expect(json.last['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json.last['remaining_user_count']).to eq last_lesson.remaining_user_count
      end
    end

    context 'ユーザがレッスン一覧を取得した場合' do
      login_user
      let(:last_lesson){ Lesson.where(start_at: Time.current.beginning_of_year..Time.current.end_of_year).last }
      let(:access_token){ user.access_token }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json.is_a?(Array)).to eq true
        expect(json.last['id']).to eq last_lesson.id
        expect(json.last['name']).to eq last_lesson.name
        expect(Time.zone.parse(json.last['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json.last['end_at'])).to eq last_lesson.end_at
        expect(json.last['color']).to eq last_lesson.color
        expect(json.last['description']).to eq last_lesson.description
        expect(json.last['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json.last['location']).to eq last_lesson.location
        expect(json.last['price']).to eq last_lesson.price
        expect(json.last['for_children']).to eq last_lesson.for_children
        expect(json.last['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json.last['remaining_user_count']).to eq last_lesson.remaining_user_count
      end
    end

    context '体験ユーザがレッスン一覧を取得した場合' do
      login_trial_user
      let(:last_lesson){ Lesson.where(start_at: Time.current.beginning_of_year..Time.current.end_of_year).last }
      let(:access_token){ trial_user.access_token }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json.is_a?(Array)).to eq true
        expect(json.last['id']).to eq last_lesson.id
        expect(json.last['name']).to eq last_lesson.name
        expect(Time.zone.parse(json.last['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json.last['end_at'])).to eq last_lesson.end_at
        expect(json.last['color']).to eq last_lesson.color
        expect(json.last['description']).to eq last_lesson.description
        expect(json.last['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json.last['location']).to eq last_lesson.location
        expect(json.last['price']).to eq last_lesson.price
        expect(json.last['for_children']).to eq last_lesson.for_children
        expect(json.last['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json.last['remaining_user_count']).to eq last_lesson.remaining_user_count
      end
    end
  end

  describe 'GET /v1/lessons/lessons_for_admin' do
    subject { get '/v1/lessons/lessons_for_admin', headers: { Authorization: access_token }  }
    context '管理者が管理者用レッスン一覧を取得した場合' do
      login_admin
      let(:last_lesson){ Lesson.where(start_at: Time.current.beginning_of_year..Time.current.end_of_year).last }
      let(:access_token){ admin.access_token }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json.is_a?(Array)).to eq true
        expect(json.last['id']).to eq last_lesson.id
        expect(json.last['name']).to eq last_lesson.name
        expect(Time.zone.parse(json.last['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json.last['end_at'])).to eq last_lesson.end_at
        expect(json.last['color']).to eq last_lesson.color
        expect(json.last['description']).to eq last_lesson.description
        expect(json.last['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json.last['location']).to eq last_lesson.location
        expect(json.last['price']).to eq last_lesson.price
        expect(json.last['for_children']).to eq last_lesson.for_children
        expect(json.last['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json.last['remaining_user_count']).to eq last_lesson.remaining_user_count
        last_user = last_lesson.users.last
        if last_user
          expect(json.last['users'].last['id']).to eq last_user.id
        else
          expect(json.last['users']).to eq []
        end
      end
    end

    context 'ユーザが管理者用レッスン一覧を取得した場合' do
      login_user
      let(:last_lesson){ Lesson.where(start_at: now.beginning_of_year..now.end_of_year).last }
      let(:access_token){ user.access_token }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end

    context '体験ユーザが管理者用レッスン一覧を取得した場合' do
      login_trial_user
      let(:last_lesson){ Lesson.where(start_at: now.beginning_of_year..now.end_of_year).last }
      let(:access_token){ trial_user.access_token }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'POST /v1/lessons' do
    subject { post '/v1/lessons', params: { lesson: lesson_params }, headers: { Authorization: access_token } }
    let(:lesson_params){ {
      lesson_class_id: lesson_class.id,
      start_at: Time.current,
      end_at: Time.current + 1.hours,
      location: Faker::University.name,
      description: Faker::Lorem.paragraph(sentence_count: 20),
      color: lesson_colors.sample,
      price: rand(1000..5000),
      for_children: Faker::Boolean.boolean,
      user_limit_count: rand(1..100),
      name: lesson_class.name,
    } }
    let(:lesson_class){ LessonClass.last }
    let(:lesson_colors){ ['', 'rose', 'green', 'azure', 'orange'] }
    context '管理者がレッスンを作成した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      it '201 Created を返す' do
        expect{subject}.to change{ Lesson.count }.by(1)
        expect(response.status).to eq 201
        last_lesson = Lesson.last
        expect(json['id']).to eq last_lesson.id
        expect(json['name']).to eq last_lesson.name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
        expect(json['color']).to eq last_lesson.color
        expect(json['description']).to eq last_lesson.description
        expect(json['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json['location']).to eq last_lesson.location
        expect(json['price']).to eq last_lesson.price
        expect(json['for_children']).to eq last_lesson.for_children
        expect(json['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json['remaining_user_count']).to eq last_lesson.remaining_user_count
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

    context '体験ユーザがレッスンを作成した場合' do
      login_trial_user
      let(:access_token){ trial_user.access_token }
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
      lesson_class_id: lesson_class.id,
      start_at: Time.current,
      end_at: Time.current + 1.hours,
      location: Faker::University.name,
      description: Faker::Lorem.paragraph(sentence_count: 20),
      color: lesson_colors.sample,
      price: rand(1000..5000),
      for_children: Faker::Boolean.boolean,
      user_limit_count: rand(1..100),
      name: lesson_class.name,
    } }
    let(:lesson_class){ LessonClass.last }
    let(:lesson_colors){ ['', 'rose', 'green', 'azure', 'orange'] }
    context '管理者がレッスン情報を変更した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_lesson = Lesson.last
        expect(json['id']).to eq last_lesson.id
        expect(json['name']).to eq last_lesson.name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
        expect(json['color']).to eq last_lesson.color
        expect(json['description']).to eq last_lesson.description
        expect(json['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json['location']).to eq last_lesson.location
        expect(json['price']).to eq last_lesson.price
        expect(json['for_children']).to eq last_lesson.for_children
        expect(json['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json['remaining_user_count']).to eq last_lesson.remaining_user_count
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

    context '体験ユーザがレッスンを変更した場合' do
      login_trial_user
      let(:access_token){ trial_user.access_token }
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
        expect(json['id']).to eq last_lesson.id
        expect(json['name']).to eq last_lesson.name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
        expect(json['color']).to eq last_lesson.color
        expect(json['description']).to eq last_lesson.description
        expect(json['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json['location']).to eq last_lesson.location
        expect(json['price']).to eq last_lesson.price
        expect(json['for_children']).to eq last_lesson.for_children
        expect(json['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json['remaining_user_count']).to eq last_lesson.remaining_user_count
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

    context 'ユーザが指定したレッスンを取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_lesson = Lesson.last
        expect(json['id']).to eq last_lesson.id
        expect(json['name']).to eq last_lesson.name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
        expect(json['color']).to eq last_lesson.color
        expect(json['description']).to eq last_lesson.description
        expect(json['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json['location']).to eq last_lesson.location
        expect(json['price']).to eq last_lesson.price
        expect(json['for_children']).to eq last_lesson.for_children
        expect(json['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json['remaining_user_count']).to eq last_lesson.remaining_user_count
      end
    end

    context '体験ユーザが指定したレッスンを取得した場合' do
      login_trial_user
      let(:access_token){ trial_user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        last_lesson = Lesson.last
        expect(json['id']).to eq last_lesson.id
        expect(json['name']).to eq last_lesson.name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
        expect(json['color']).to eq last_lesson.color
        expect(json['description']).to eq last_lesson.description
        expect(json['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json['location']).to eq last_lesson.location
        expect(json['price']).to eq last_lesson.price
        expect(json['for_children']).to eq last_lesson.for_children
        expect(json['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json['remaining_user_count']).to eq last_lesson.remaining_user_count
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

    context '体験ユーザが指定したレッスンを削除した場合' do
      login_trial_user
      let(:access_token){ trial_user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '403 Forbidden を返す' do
        expect{subject}.to change{Lesson.count}.by(0)
        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
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
      let(:last_lesson){ Lesson.last }
      let(:lesson_id){ last_lesson.id }
      it '200 OK を返す' do
        expect{subject}.to change{UserLesson.count}.by(1)
        expect(response.status).to eq 200
        last_lesson = Lesson.last
        expect(json['id']).to eq last_lesson.id
        expect(json['name']).to eq last_lesson.name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
        expect(json['color']).to eq last_lesson.color
        expect(json['description']).to eq last_lesson.description
        expect(json['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json['location']).to eq last_lesson.location
        expect(json['price']).to eq last_lesson.price
        expect(json['for_children']).to eq last_lesson.for_children
        expect(json['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json['remaining_user_count']).to eq last_lesson.remaining_user_count
      end
    end

    context 'ユーザが指定したレッスンに参加した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:last_lesson){ Lesson.last }
      let(:lesson_id){ last_lesson.id }
      before do
        user.plans = Plan.all
      end
      it '200 OK を返す' do
        expect{subject}.to change{UserLesson.count}.by(1)
        expect(response.status).to eq 200
        last_lesson = Lesson.last
        expect(json['id']).to eq last_lesson.id
        expect(json['name']).to eq last_lesson.name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
        expect(json['color']).to eq last_lesson.color
        expect(json['description']).to eq last_lesson.description
        expect(json['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json['location']).to eq last_lesson.location
        expect(json['price']).to eq last_lesson.price
        expect(json['for_children']).to eq last_lesson.for_children
        expect(json['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json['remaining_user_count']).to eq last_lesson.remaining_user_count
      end
    end

    context 'ユーザが存在しないレッスンへ参加した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id + 1 }
      it '404 Not Found を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 404
        expect(json['code']).to eq 'lesson_not_found'
      end
    end

    context 'ユーザが既に参加しているレッスンへ参加した場合' do
      login_user
      before do
        user.plans = Plan.all
        Lesson.last.join(user)
      end
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '400 Bad Request を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 400
        expect(json['code']).to eq 'user_already_joined'
      end
    end

    context 'ユーザが過去のレッスンへ参加しようとした場合' do
      login_user
      before do
        user.plans = Plan.all
        last_lesson = Lesson.last
        last_lesson.start_at = last_lesson.start_at - 1.month
        last_lesson.end_at = last_lesson.end_at - 1.month
        last_lesson.save!
      end
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '400 Bad Request を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 400
        expect(json['code']).to eq 'cant_join_to_past_lesson'
      end
    end

    context 'ユーザが参加できないクラスのレッスンへ参加した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '400 Bad Request を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 400
        expect(json['code']).to eq 'cant_join_to_this_lesson'
      end
    end

    context 'ユーザが参加可能人数を超えているレッスンへ参加した場合' do
      login_user
      before do
        user.plans = Plan.all
        last_lesson = Lesson.last
        last_lesson.user_limit_count = 0
        last_lesson.save!
      end
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '400 Bad Request を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 400
        expect(json['code']).to eq 'user_limit_count_error'
      end
    end

    context '体験ユーザが他のレッスンへ参加しようとした場合' do
      login_trial_user
      before do
        Lesson.first.join(trial_user)
      end
      let(:access_token){ trial_user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '400 Bad Request を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 400
        expect(json['code']).to eq 'trial_user_cant_join_to_lesson'
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
      login_admin
      before do
        Lesson.last.join(admin)
      end
      let(:access_token){ admin.access_token }
      let(:last_lesson){ Lesson.last }
      let(:lesson_id){ last_lesson.id }
      it '200 OK を返す' do
        expect{subject}.to change{UserLesson.count}.by(-1)
        expect(response.status).to eq 200
        expect(json['id']).to eq last_lesson.id
        expect(json['name']).to eq last_lesson.name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
        expect(json['color']).to eq last_lesson.color
        expect(json['description']).to eq last_lesson.description
        expect(json['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json['location']).to eq last_lesson.location
        expect(json['price']).to eq last_lesson.price
        expect(json['for_children']).to eq last_lesson.for_children
        expect(json['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json['remaining_user_count']).to eq last_lesson.remaining_user_count
      end
    end

    context 'ユーザが指定したレッスンから辞退した場合' do
      login_user
      before do
        user.plans = Plan.all
        Lesson.last.join(user)
      end
      let(:access_token){ user.access_token }
      let(:last_lesson){ Lesson.last }
      let(:lesson_id){ last_lesson.id }
      it '200 OK を返す' do
        expect{subject}.to change{UserLesson.count}.by(-1)
        expect(response.status).to eq 200
        expect(json['id']).to eq last_lesson.id
        expect(json['name']).to eq last_lesson.name
        expect(Time.zone.parse(json['start_at'])).to eq last_lesson.start_at
        expect(Time.zone.parse(json['end_at'])).to eq last_lesson.end_at
        expect(json['color']).to eq last_lesson.color
        expect(json['description']).to eq last_lesson.description
        expect(json['lesson_class_id']).to eq last_lesson.lesson_class.id
        expect(json['location']).to eq last_lesson.location
        expect(json['price']).to eq last_lesson.price
        expect(json['for_children']).to eq last_lesson.for_children
        expect(json['user_limit_count']).to eq last_lesson.user_limit_count
        expect(json['remaining_user_count']).to eq last_lesson.remaining_user_count
      end
    end

    context 'ユーザが存在しないレッスンから辞退した場合' do
      login_user
      before do
        user.plans = Plan.all
      end
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id + 1 }
      it '404 Not Found を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 404
        expect(json['code']).to eq 'lesson_not_found'
      end
    end

    context 'ユーザが参加していないレッスンから辞退した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '400 Bad Request を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 400
        expect(json['code']).to eq 'user_not_joined'
      end
    end

    context 'ユーザが過去のレッスンへ参加取り消ししようとした場合' do
      login_user
      before do
        user.plans = Plan.all
        last_lesson = Lesson.last
        last_lesson.join(user)
        last_lesson.start_at = last_lesson.start_at - 1.month
        last_lesson.end_at = last_lesson.end_at - 1.month
        last_lesson.save!
      end
      let(:access_token){ user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '400 Bad Request を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 400
        expect(json['code']).to eq 'cant_leave_to_past_lesson'
      end
    end

    context '体験ユーザがレッスンから辞退した場合' do
      login_trial_user
      before do
        Lesson.first.join(trial_user)
      end
      let(:access_token){ trial_user.access_token }
      let(:lesson_id){ Lesson.last.id }
      it '400 Bad Request を返す' do
        expect{subject}.to change{UserLesson.count}.by(0)
        expect(response.status).to eq 400
        expect(json['code']).to eq 'trial_user_cant_leave_to_lesson'
      end
    end
  end
end
