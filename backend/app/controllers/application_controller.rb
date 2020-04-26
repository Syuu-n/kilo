class ApplicationController < ActionController::API
  before_action :authenticate_user_from_token!

  respond_to :json

  # user 認証 OAuth2 を使用
  def authenticate_user_from_token!
    auth_token = request.headers['Authorization']

    if auth_token
      authenticate_with_auth_token auth_token
    else
      authenticate_error
    end
  end

  private

  def authenticate_with_auth_token(auth_token)
    unless auth_token.include?(':')
      authenticate_error
      return
    end

    user_id = auth_token.split(':').first
    user = User.find_by(id: user_id)

    if user && Devise.secure_compare(user.access_token, auth_token)
      #  ユーザ認証成功
      sign_in user, store: false
    else
      authenticate_error
    end
  end

  # 認証失敗
  # ステータスコード 401 を返す
  def authenticate_error
    render json: { error: 'devise.failure.unauthenticated' }, status: 401
  end
end
