class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  #skip_before_action :verify_authenticity_token
  include DeviseTokenAuth::Concerns::SetUserByToken
  
  wrap_parameters false
  #include DeviseTokenAuth::Concerns::SetUserByToken

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
 
  #before_action :configure_permitted_parameters, if: :devise_controller?
  


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :confirm_success_url])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
  end
end
