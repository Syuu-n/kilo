module ControllerHelpers
  def find_admin_user
    User.find_by(role: Role.admin)
  end

  def find_user
    User.find_by(role: Role.normal)
  end

  def find_trial_user
    User.find_by(role: Role.trial)
  end

  def sent_emails
    ActionMailer::Base.deliveries
  end

  def last_email
    ActionMailer::Base.deliveries.last
  end

  def reset_email
    ActionMailer::Base.deliveries.clear
  end
end
