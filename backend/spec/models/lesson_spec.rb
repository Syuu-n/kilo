require 'rails_helper'

describe Lesson, type: :model do
  describe 'バリデーション' do
    let(:lesson_params){
      {
        lesson_class_id: rand(1..3),
        start_at: Time.current,
        end_at: Time.current + 1.hours,
        location: Faker::University.name,
        name: Faker::Address.city,
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
      context '#class_name' do
        it '指定したレッスンのクラス名を取得できる' do
          expect(lesson.class_name).to eq lesson.lesson_class.name
        end
      end

      context '#class_description' do
        it '指定したレッスンの説明を取得できる' do
          expect(lesson.class_description).to eq lesson.lesson_class.description
        end
      end

      context '#class_color' do
        it '指定したレッスンのカラーを取得できる' do
          expect(lesson.class_color).to eq lesson.lesson_class.color
        end
      end

      context '#remaining_user_count' do
        it '指定したレッスンへの参加可能人数を取得できる' do
          expect(lesson.remaining_user_count).to eq lesson.user_limit_count
        end
      end

      context '#joined?' do
        before do
          user.plans = Plan.all
          lesson.join(user)
        end
        it '指定したレッスンに参加しているか確認できる' do
          expect(lesson.joined?(user)).to eq true
        end
      end

      context '#join' do
        it '指定したレッスンに参加できる' do
          user.plans = Plan.all
          lesson.join(user)

          expect(lesson.users.include?(user)).to eq true
        end
      end

      context '#leave' do
        before do
          user.plans = Plan.all
          lesson.join(user)
        end
        it '指定したレッスンから辞退できる' do
          lesson.leave(user)

          expect(lesson.users.include?(user)).to eq false
        end
      end

      context '#leave_all' do
        it 'レッスン全てから辞退できる' do
          lesson.leave_all

          expect(lesson.users).to eq []
        end
      end
    end

    context '異常系' do
      let(:user){ create(:user) }
      let(:trial_user){ create(:trial) }
      let(:lesson){ Lesson.first }
      context '#join' do
        it '体験中のユーザは他のレッスンへ参加できない' do
          UserLesson.create(user_id: trial_user.id, lesson_id: lesson.id)

          expect{ lesson.join(trial_user) }.to raise_error(Lesson::CantJoinOrLeaveTrialUserError)
        end

        it '同じレッスンへ再度参加できない' do
          user.plans = Plan.all
          lesson.join(user)

          expect{ lesson.join(user) }.to raise_error(Lesson::AlreadyJoinedError)
        end

        it 'ユーザが参加できないクラスのレッスンの場合' do
          expect{ lesson.join(user) }.to raise_error(Lesson::CantJoinLessonClassError)
        end

        it '参加可能数を超えているレッスンへ参加できない' do
          user.plans = Plan.all
          lesson.user_limit_count = 0

          expect{ lesson.join(user) }.to raise_error(Lesson::UserLimitCountError)
        end
      end

      context '#leave' do
        it '体験中のユーザはレッスンから辞退できない' do
          UserLesson.create(user_id: trial_user.id, lesson_id: lesson.id)

          expect{ lesson.leave(trial_user) }.to raise_error(Lesson::CantJoinOrLeaveTrialUserError)
        end

        it '参加していないレッスンから辞退できない' do
          expect{ lesson.leave(user) }.to raise_error(Lesson::NotJoinedError)
        end
      end
    end
  end
end
