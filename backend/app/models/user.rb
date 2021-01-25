class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  belongs_to :role
  has_many :user_plans, dependent: :destroy
  has_many :plans, through: :user_plans
  has_many :user_lessons, dependent: :destroy
  has_many :lessons, through: :user_lessons

  after_create :update_access_token!

  VALID_EMAIL_REGEX = /\A[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/

  validates :first_name, presence: true, length: { maximum: 20 }
  validates :last_name, presence: true, length: { maximum: 20 }
  validates :first_name_kana, presence: true, length: { maximum: 20 }
  validates :last_name_kana, presence: true, length: { maximum: 20 }
  validates :email, {
    presence: true,
    uniqueness: { case_sensitive: true },
    format: { with: VALID_EMAIL_REGEX },
    length: { maximum: 191 },
  }
  validates :birthday, presence: true
  validates :phone_number, presence: true
  validates :role, presence: true

  def update_access_token!
    # 有効期限 14 日の access_token 作成
    self.access_token = "#{id}:#{Devise.friendly_token}"
    self.access_token_expire = Time.current.since(14.days)
    save
  end

  def access_token_expired?
    self.access_token_expire < Time.current
  end

  def name
    last_name + " " + first_name
  end

  def name_kana
    last_name_kana + " " + first_name_kana
  end

  def is_admin?
    self.role.admin?
  end

  def is_trial?
    self.role.trial?
  end

  def age
    # 現在の年齢
    (Date.today.strftime('%Y%m%d').to_i - birthday.strftime('%Y%m%d').to_i) / 10000
  end

  def current_monthly_count
    # 今月のレッスン参加数
    self.lessons.where(start_at: Time.current.all_month).count
  end

  def user_lesson_classes
    # ユーザが参加できるクラス一覧を取得する
    raw_lesson_classes = self.plans.map {|plan| plan.lesson_classes}
    if (raw_lesson_classes)
      formatted_lesson_classes = raw_lesson_classes.flatten.uniq
      return formatted_lesson_classes
    end
    return
  end
end
