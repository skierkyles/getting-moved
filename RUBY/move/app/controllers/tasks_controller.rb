class TasksController < ApplicationController
  def show
    @task = Task.find(params[:id])
  end

  def new
    puts "New Task!"
    @task = Task.new
  end

  def create
    puts "Got the task!"

    @task = Task.new(task_params)
    if @current_user
      print @current_user
      @task.user_id = @current_user.id
    end

    if @task.save
      redirect_to @task
    else
      render 'new'
    end
  end

  private
    def task_params
      params.require(:task).permit(:title)
    end
end
