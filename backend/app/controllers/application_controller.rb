class ApplicationController < ActionController::API
  before_action :authenticate_user_from_token!

  respond_to :json

  rescue_from StandardError,
              with: lambda { |e| render_error(e) }

  # Standard のエラーハンドリング
  def render_error(exception)
    status_code = ActionDispatch::ExceptionWrapper.new(env, exception).status_code
    render json: { message: exception.message }, status: status_code
  end

  # user 認証
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
      if user.access_token_expired?
        access_token_expired_error
      else
        #  ユーザ認証成功
        sign_in user, store: false
      end
    else
      authenticate_error
    end
  end

  # 認証失敗
  # ステータスコード 401 を返す
  def authenticate_error
    render json: { code: 'unauthenticated' }, status: :unauthorized
  end

  # access_token の有効期限切れ
  def access_token_expired_error
    render json: { code: 'access_token_expired' }, status: :forbidden
  end

  def permission_check
    unless current_user.is_admin?
      render json: { code: 'not_permitted' }, status: :forbidden and return
    end
  end
end
