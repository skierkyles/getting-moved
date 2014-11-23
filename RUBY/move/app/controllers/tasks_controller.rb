class TasksController < ApplicationController
  def show
    @task = Task.find(params[:id])
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)
    if current_user
      @task.user_id = current_user.id
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
