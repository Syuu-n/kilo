require 'rails_helper'

describe User, type: :model do
  describe 'バリデーション' do
    let(:user){ build(:user) }
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

  describe 'メソッド' do
    let(:admin){ create(:admin) }
    let(:user){ create(:user) }
    let(:trial){ create(:trial) }
    context '正常系' do
      context '#update_access_token!' do
        let!(:before_access_token){ user.access_token }
        let!(:before_access_token_expire){ user.access_token_expire }
        subject { user.update_access_token! }
        it 'アクセストークンの更新ができる' do
          travel_to(Time.current + 1.hours) do
            subject
            expect(user.access_token).not_to eq before_access_token
            expect(user.access_token_expire).not_to eq before_access_token_expire
          end
        end
      end

      context '#access_token_expired?' do
        subject { user.access_token_expired? }
        it 'アクセストークンの期間が切れていないかを確認できる' do
          expect(user.access_token_expired?).to eq false

          travel_to(Time.current + 15.days) do
            expect(subject).to eq true
          end
        end
      end

      context '#name' do
        subject { user.name }
        it 'フルネームを取得できる' do
          expect(subject).to eq user.last_name + " " + user.first_name
        end
      end

      context '#name_kana' do
        subject { user.name_kana }
        it 'カタカナのフルネームを取得できる' do
          expect(subject).to eq user.last_name_kana + " " + user.first_name_kana
        end
      end

      context '#is_admin?' do
        it 'ユーザが管理者か確認できる' do
          expect(admin.is_admin?).to eq true
          expect(user.is_admin?).to eq false
          expect(trial.is_admin?).to eq false
        end
      end

      context '#is_trial?' do
        it 'ユーザが体験中か確認できる' do
          expect(admin.is_trial?).to eq false
          expect(user.is_trial?).to eq false
          expect(trial.is_trial?).to eq true
        end
      end

      context '#age' do
        let(:userAge){ (Date.today.strftime('%Y%m%d').to_i - user.birthday.strftime('%Y%m%d').to_i) / 10000 }
        it 'ユーザの年齢を取得できる' do
          expect(user.age).to eq userAge
        end
      end

      context '#current_monthly_count' do
        let(:count){ user.lessons.count }
        it 'ユーザの現在のレッスン参加数を取得できる' do
          expect(user.current_monthly_count).to eq count
        end
      end

      context '#remaining_monthly_count' do
        let(:count){ user.plan.monthly_lesson_count - user.current_monthly_count }
        it 'ユーザの残りレッスン参加数を取得できる' do
          expect(user.remaining_monthly_count).to eq count
        end
      end
    end
  end
end
