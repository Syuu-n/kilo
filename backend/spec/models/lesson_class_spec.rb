require 'rails_helper'

describe LessonClass, type: :model do
  describe 'バリデーション' do
    let(:lesson_class_params){
      {
        name: Faker::Address.city,
        description: Faker::Lorem.word
      }
    }
    context '正常系' do
      let(:lesson_class){ LessonClass.new(lesson_class_params) }
      it '全てのバリデーションが正しい' do
        expect(lesson_class.valid?).to eq true
      end
    end

    context '異常系' do
      let(:lesson_class){ LessonClass.new(lesson_class_params) }
      it '名前が空欄の場合エラーする' do
        lesson_class.name = nil
        expect(lesson_class.valid?).to eq false
      end
    end
  end
end
