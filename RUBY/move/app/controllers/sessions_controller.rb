class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      # sign them in yo!
      sign_in user
      redirect_to user
    else
      # Yo shiz didn't work bro
      # Figure out "Flash" messages for errors
      render 'new'
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end
end
