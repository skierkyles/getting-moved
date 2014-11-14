class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])

    @tasks = @user.tasks
  end

  def index
    if current_user
      redirect_to current_user
    else
      redirect_to action: 'new'
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to @user
    else
      render 'new'
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
