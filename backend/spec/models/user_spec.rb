require 'rails_helper'

describe User, type: :model do
  let(:user){ build(:user) }
  describe 'バリデーション' do
    context '正常系' do
      it '全てのバリデーションが正しい' do
        expect(user.valid?).to eq true
      end
    end

    context '異常系' do
      it '名前が空欄の場合エラーする' do
        user.first_name = nil
        expect(user.valid?).to eq false
      end

      it '名字が空欄の場合エラーする' do
        user.last_name = nil
        expect(user.valid?).to eq false
      end

      it '名前（カナ）が空欄の場合エラーする' do
        user.first_name_kana = nil
        expect(user.valid?).to eq false
      end

      it '名字（カナ）が空欄の場合エラーする' do
        user.last_name_kana = nil
        expect(user.valid?).to eq false
      end

      it 'メールアドレスが空欄の場合エラーする' do
        user.email = nil
        expect(user.valid?).to eq false
      end

      it 'メールアドレスの形式が正しくない場合エラーする' do
        user.email = Faker::Name.first_name
        expect(user.valid?).to eq false
      end

      it '生年月日が空欄の場合エラーする' do
        user.birthday = nil
        expect(user.valid?).to eq false
      end

      it '電話番号が空欄の場合エラーする' do
        user.birthday = nil
        expect(user.valid?).to eq false
      end
    end
  end
end
