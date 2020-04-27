module AuthenticationHelpers
  def login_admin
    let(:admin){ create(:admin) }
    before do
      sign_in admin
    end
  end

  def login_user
    let(:user){ create(:user) }
    before do
      sign_in user
    end
  end
end
