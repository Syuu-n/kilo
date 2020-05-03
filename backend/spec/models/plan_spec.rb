require 'rails_helper'

describe Plan, type: :model do
  describe 'バリデーション' do
    let(:plan_params){
      {
        name: Faker::Address.city,
        price: rand(1..5000),
        monthly_lesson_count: rand(1..4),
        for_children: Faker::Boolean.boolean
      }
    }
    context '正常系' do
      let(:plan){ Plan.new(plan_params) }
      it '全てのバリデーションが正しい' do
        expect(plan.valid?).to eq true
      end
    end

    context '異常系' do
      let(:plan){ Plan.new(plan_params) }
      it '名前が空欄の場合エラーする' do
        plan.name = nil
        expect(plan.valid?).to eq false
      end

      it '価格が空欄の場合エラーする' do
        plan.price = nil
        expect(plan.valid?).to eq false
      end

      it '月の参加回数が空欄の場合エラーする' do
        plan.monthly_lesson_count = nil
        expect(plan.valid?).to eq false
      end

      it '子供用フラグが空欄の場合エラーする' do
        plan.for_children = nil
        expect(plan.valid?).to eq false
      end
    end
  end

  describe 'メソッド' do
    context '正常系' do
      context '#default_plan' do
        it 'デフォルトプランを取得できる' do
          expect(Plan.default_plan).to eq Plan.first
        end
      end
    end
  end
end
