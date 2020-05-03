require 'rails_helper'

describe Role, type: :model do
  describe 'バリデーション' do
    let(:role_params){
      {
        name: ['admin', 'normal', 'trial'][rand(0..2)]
      }
    }
    context '異常系' do
      let(:role){ Role.new(role_params) }
      it '名前が空欄の場合エラーする' do
        role.name = nil
        expect(role.valid?).to eq false
      end

      it '同じ名前が存在するとエラーする' do
        expect(role.valid?).to eq false
      end
    end

    describe 'メソッド' do
      let(:admin_role){ Role.find_by(name: 'admin') }
      let(:normal_role){ Role.find_by(name: 'normal') }
      let(:trial_role){ Role.find_by(name: 'trial') }
      context '正常系' do
        context '#admin?' do
          it '管理者のロールか確認できる' do
            expect(admin_role.admin?).to eq true
            expect(normal_role.admin?).to eq false
            expect(trial_role.admin?).to eq false
          end
        end

        context '#trial?' do
          it '体験中のロールか確認できる' do
            expect(admin_role.trial?).to eq false
            expect(normal_role.trial?).to eq false
            expect(trial_role.trial?).to eq true
          end
        end

        context '#admin' do
          it '管理者ロールを取得できる' do
            expect(Role.admin).to eq admin_role
            expect(Role.admin).not_to eq normal_role
            expect(Role.admin).not_to eq trial_role
          end
        end

        context '#normal' do
          it '通常ロールを取得できる' do
            expect(Role.normal).not_to eq admin_role
            expect(Role.normal).to eq normal_role
            expect(Role.normal).not_to eq trial_role
          end
        end

        context '#trial' do
          it '体験中ロールを取得できる' do
            expect(Role.trial).not_to eq admin_role
            expect(Role.trial).not_to eq normal_role
            expect(Role.trial).to eq trial_role
          end
        end
      end
    end
  end
end
