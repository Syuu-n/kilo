require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = build(:user)
  end

  describe 'バリデーション' do
    context '正常系' do
      it '全てのバリデーションが正しい' do
        expect(@user.valid?).to eq true
      end
    end

    context '異常系' do
      it '名前が空欄の場合エラーする' do
        @user.first_name = nil
        expect(@user.valid?).to eq false
      end
    end
  end
end
