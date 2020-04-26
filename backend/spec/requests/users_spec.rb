require 'rails_helper'

describe 'Users API', type: :request do
  let(:admin_user){ find_admin_user }
  let(:user){ find_normal_user }
  describe 'POST /v1/users' do
    subject { post '/users' }
    context '管理者の場合' do
      it 'ユーザを作成できる' do
        subject
      end
    end
  end
end
