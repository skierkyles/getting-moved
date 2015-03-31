class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])

    @tasks = @user.tasks

    @is_current_user = current_user == @user

    @can_have_relationship = (current_user != @user) && (current_user != nil)

    if @can_have_relationship
      @relationship = current_user.has_relationship_with?(@user)
    end

    # Stats section
    @month_by_month =  Hash[ @user.tasks_logged.to_a.group_by_month{|u| u.task_date }.map{|k, v| [k.strftime("%B"), v.size] } ]

    puts @month_by_month
    if @month_by_month.keys.length > 0
      @month_by_month_max = @month_by_month.max_by{|k,v| v}[1] + 2
    end

    @day_by_day =  Hash[ @user.tasks_logged.where(['task_date > ?', 4.week.ago]).to_a.group_by_day{|u| u.task_date }.map{|k, v| [k.strftime("%m/%d"), v.size] } ]
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
    @user = User.new(new_params)
    if @user.save
      redirect_to @user
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    puts "Update User: Things I'm trying to SAVE!"
    puts update_params
    puts "Updating this user"
    puts @user
    puts "is_valid? #{@user.valid?}"
    puts "errors #{@user.errors.inspect}"

    if @user.update(update_params)
      redirect_to @user
    else
      render 'edit'
    end
  end

  private
    def update_params
      allowed_params = params.require(:user).permit(:avatar, :name, :password, :password_confirmation)
      allowed_params.delete_if {|k,v| v.blank?}
    end

    def new_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
