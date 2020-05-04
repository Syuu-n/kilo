require 'rails_helper'

describe 'Plans API', type: :request do
  let(:json){ JSON.parse response.body }
  describe 'GET /v1/plans' do
    subject { get '/v1/plans', headers: { Authorization: access_token }  }
    context '管理者がプラン一覧を取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:last_plan){ Plan.last }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        expect(json.is_a?(Array)).to eq true
        expect(json.last['id']).to eq last_plan.id
        expect(json.last['name']).to eq last_plan.name
        expect(json.last['price']).to eq last_plan.price
        expect(json.last['monthly_lesson_count']).to eq last_plan.monthly_lesson_count
        expect(json.last['for_children']).to eq last_plan.for_children
      end
    end

    context 'ユーザがクラス一覧を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'POST /v1/plans' do
    subject { post '/v1/plans', params: { plan: plan_params },
                   headers: { Authorization: access_token } }
    let(:plan_params){ {
      name: Faker::Space.galaxy,
      price: rand(100..5000),
      monthly_lesson_count: rand(1..8),
      for_children: Faker::Boolean.boolean
    } }
    context '管理者がプランを作成した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      it '201 Created を返す' do
        expect{subject}.to change{ Plan.count }.by(1)
        expect(response.status).to eq 201
        new_plan = Plan.last
        expect(json['name']).to eq new_plan.name
        expect(json['price']).to eq new_plan.price
        expect(json['monthly_lesson_count']).to eq new_plan.monthly_lesson_count
        expect(json['for_children']).to eq new_plan.for_children
      end
    end

    context '管理者が形式の正しくないプランを作成した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:plan_params){ {
        name: nil
      } }
      it '422 Unprocessable Entity を返す' do
        expect{subject}.to change{ Plan.count }.by(0)
        expect(response.status).to eq 422
        expect(json['code']).to eq 'plan_create_error'
      end
    end

    context 'ユーザがプランを作成した場合' do
      login_user
      let(:access_token){ user.access_token }
      it '403 Forbidden を返す' do
        expect{subject}.to change{ Plan.count }.by(0)
        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'PATCH /v1/plans/:id' do
    subject { patch "/v1/plans/#{plan_id}", params: { plan: plan_params },
                    headers: { Authorization: access_token } }
    let(:plan_params){ {
      name: Faker::Space.galaxy,
      price: rand(100..5000),
      monthly_lesson_count: rand(1..8),
      for_children: Faker::Boolean.boolean
    } }
    context '管理者がプラン情報を変更した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:plan_id){ Plan.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        plan = Plan.last
        expect(json['name']).to eq plan.name
        expect(json['price']).to eq plan.price
        expect(json['monthly_lesson_count']).to eq plan.monthly_lesson_count
        expect(json['for_children']).to eq plan.for_children
      end
    end

    context '管理者が形式の正しくないプラン情報へ変更した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:plan_params){ {
        name: nil
      } }
      let(:plan_id){ Plan.last.id }
      it '422 Unprocessable Entity を返す' do
        subject

        expect(response.status).to eq 422
        expect(json['code']).to eq 'plan_update_error'
      end
    end

    context '管理者が存在しないプラン情報を変更した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:plan_id){ Plan.last.id + 1 }
      it '404 Not Found を返す' do
        subject

        expect(response.status).to eq 404
        expect(json['code']).to eq 'plan_not_found'
      end
    end

    context 'ユーザがプラン情報を変更した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:plan_id){ Plan.last.id }
      it '403 Forbidden を返す' do
        subject

        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end

  describe 'GET /plans/:id' do
    subject { get "/v1/plans/#{plan_id}", headers: { Authorization: access_token }  }
    context '管理者が指定したプラン情報を取得した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:plan_id){ Plan.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        plan = Plan.last
        expect(json['name']).to eq plan.name
        expect(json['price']).to eq plan.price
        expect(json['monthly_lesson_count']).to eq plan.monthly_lesson_count
        expect(json['for_children']).to eq plan.for_children
      end
    end

    context 'ユーザが指定したプラン情報を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:plan_id){ Plan.last.id }
      it '200 OK を返す' do
        subject

        expect(response.status).to eq 200
        plan = Plan.last
        expect(json['name']).to eq plan.name
        expect(json['price']).to eq plan.price
        expect(json['monthly_lesson_count']).to eq plan.monthly_lesson_count
        expect(json['for_children']).to eq plan.for_children
      end
    end

    context '存在しないプラン情報を取得した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:plan_id){ Plan.last.id + 1 }
      it '404 NotFound を返す' do
        subject

        expect(response.status).to eq 404
        expect(json['code']).to eq 'plan_not_found'
      end
    end
  end

  describe 'DELETE /plans/:id' do
    subject { delete "/v1/plans/#{plan_id}", headers: { Authorization: access_token }  }
    context '管理者が指定したプランを削除した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:plan_id){ Plan.last.id }
      it '200 OK を返す' do
        expect{subject}.to change{Plan.count}.by(-1)
        expect(response.status).to eq 200
        expect(json['message']).to eq 'Plan deleted.'
      end
    end

    context '管理者が存在しないプランを削除した場合' do
      login_admin
      let(:access_token){ admin.access_token }
      let(:plan_id){ Plan.last.id + 1 }
      it '404 NotFound を返す' do
        expect{subject}.to change{Plan.count}.by(0)
        expect(response.status).to eq 404
        expect(json['code']).to eq 'plan_not_found'
      end
    end

    context 'ユーザが指定したプランを削除した場合' do
      login_user
      let(:access_token){ user.access_token }
      let(:plan_id){ Plan.last.id }
      it '403 Forbidden を返す' do
        expect{subject}.to change{Plan.count}.by(0)
        expect(response.status).to eq 403
        expect(json['code']).to eq 'not_permitted'
      end
    end
  end
end
