require 'rails_helper'

describe Lesson, type: :model do
  describe 'バリデーション' do
    let(:lesson_params){
      {
        lesson_class_id: rand(1..3),
        start_at: Time.current,
        end_at: Time.current + 1.hours
      }
    }
    context '正常系' do
      let(:lesson){ Lesson.new(lesson_params) }
      it '全てのバリデーションが正しい' do
        expect(lesson.valid?).to eq true
      end
    end

    context '異常系' do
      let(:lesson){ Lesson.new(lesson_params) }
      it '開始時刻が空欄の場合エラーする' do
        lesson.start_at = nil
        expect(lesson.valid?).to eq false
      end

      it '終了時刻が空欄の場合エラーする' do
        lesson.end_at = nil
        expect(lesson.valid?).to eq false
      end
    end
  end

  describe 'メソッド' do
    context '正常系' do
      before do
        lesson.user_lessons.each do |ul|
          ul.destroy
        end
      end
      let(:user){ create(:user) }
      let(:lesson){ Lesson.first }
      context '#joined?' do
        before do
          lesson.join(user)
        end
        it '指定したレッスンに参加しているか確認できる' do
          expect(lesson.joined?(user)).to eq true
        end
      end

      context '#join' do
        it '指定したレッスンに参加できる' do
          lesson.join(user)

          expect(lesson.users.include?(user)).to eq true
        end
      end

      context '#leave' do
        before do
          lesson.join(user)
        end
        it '指定したレッスンから辞退できる' do
          lesson.leave(user)

          expect(lesson.users.include?(user)).to eq false
        end
      end
    end
  end
end
