require 'rails_helper'

describe LessonRule, type: :model do
  describe 'バリデーション' do
    def create_params
      start_time = Time.current + rand(0..12).hours
      params = { dotw: rand(0..6), start_at: start_time,
                 end_at: start_time + rand(1..12).hours,
                 lesson_class_id: rand(1..3)}
      if LessonRule.find_by(params)
        create_params
      else
        params
      end
    end
    let(:lesson_rule_params){ create_params }
    context '正常系' do
      let(:lesson_rule){ LessonRule.new(lesson_rule_params) }
      it '全てのバリデーションが正しい' do
        expect(lesson_rule.valid?).to eq true
      end
    end

    context '異常系' do
      let(:lesson_rule){ LessonRule.new(lesson_rule_params) }
      let(:dup_stat_at){ LessonRule.first.start_at }
      let(:dup_end_at){ LessonRule.first.end_at }
      let(:dup_lesson_class_id){ LessonRule.first.lesson_class_id }
      let(:dup_dotw){ LessonRule.first.dotw }
      it '曜日が空欄の場合エラーする' do
        lesson_rule.dotw = nil
        expect(lesson_rule.valid?).to eq false
      end

      it '開始時間が空欄の場合エラーする' do
        lesson_rule.start_at = nil
        expect(lesson_rule.valid?).to eq false
      end

      it '終了時間が空欄の場合エラーする' do
        lesson_rule.end_at = nil
        expect(lesson_rule.valid?).to eq false
      end

      it '既に曜日とクラス、開始時間が同じルールが有る場合エラーする' do
        lesson_rule.dotw = dup_dotw
        lesson_rule.lesson_class_id = dup_lesson_class_id
        lesson_rule.start_at = dup_stat_at
        expect(lesson_rule.valid?).to eq false
      end

      it '既に曜日とクラス、終了時間が同じルールが有る場合エラーする' do
        lesson_rule.dotw = dup_dotw
        lesson_rule.lesson_class_id = dup_lesson_class_id
        lesson_rule.end_at = dup_end_at
        expect(lesson_rule.valid?).to eq false
      end
    end
  end
end
