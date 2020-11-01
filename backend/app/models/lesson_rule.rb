class LessonRule < ApplicationRecord
  belongs_to :lesson_class

  # week は週の何周目かを表す e.g. 1=1週目 2=2週目 3=3週目 4=４周目 0=毎週
  validates :week, presence: true
  # dotw は何曜日かを表す e.g. 0=日曜日 1=月曜日 2=火曜日 3=水曜日 4=木曜日 5=金曜日 6=土曜日
  validates :dotw, presence: true
  validates :start_at, presence: true, uniqueness: { scope: [:week, :dotw, :lesson_class_id] }
  validates :end_at, presence: true, uniqueness: { scope: [:week, :dotw, :lesson_class_id] }
end
