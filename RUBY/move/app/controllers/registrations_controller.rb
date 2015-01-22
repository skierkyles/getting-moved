class Users::RegistrationsController < Devise::RegistrationsController
  # http://stackoverflow.com/questions/16379554/strong-parameters-with-rails-4-0-and-devise
  before_filter :configure_permitted_parameters

  protected

  # my custom fields are :name, :heard_how
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:name, :email, :password, :password_confirmation)
    end
  end
end