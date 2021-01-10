require 'net/http'
require 'uri'

module Notify
  class LineNotify
    TOKEN =
      case Rails.env
      when "development"
        Rails.application.credentials.line_notify[:token_dev]
      when "production"
        Rails.application.credentials.line_notify[:token]
      end
    URL = 'https://notify-api.line.me/api/notify'.freeze

    def send(message)
      params = {message: message}
      Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |https|
        https.request(request(message))
      end
    end

    # 体験申し込みがメール認証されたタイミングで通知される
    def trial_start(user)
      lesson = user.lessons.first
      send(
        "\n体験申し込みがありました。\n\n名前：#{user.last_name} #{user.first_name}\n名前（カナ）：#{user.last_name_kana} #{user.first_name_kana}\nメールアドレス：#{user.email}\n生年月日：#{user.birthday.strftime('%Y年 %m月 %d日')}\n電話番号：#{user.phone_number}\n体験希望クラス：#{lesson.lesson_class.name}\n体験希望日：#{lesson.start_at.strftime('%Y年 %m月 %d日 %H時 %M分')}"
      )
    end

    private

    def request(message)
      request = Net::HTTP::Post.new(uri)
      request['Authorization'] = "Bearer #{TOKEN}"
      request.set_form_data(message: message)
      request
    end

    def uri
      URI.parse(URL)
    end
  end
end