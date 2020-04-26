require 'rails_helper'

describe 'Users API', type: :request do
  let(:admin_user){ create(:admin_user) }
  let(:user){ create(:user) }
  describe 'POST /v1/users' do
    subject {  }
    context '管理者はユーザを作成できる' do

    end
  end
end
