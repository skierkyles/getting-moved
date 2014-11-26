class LoggedTasksController < ApplicationController
  def index
    @logged_tasks = LoggedTask.all
  end

  def new
    task_id = params[:task_id]
    @logged_task = LoggedTask.new
    @logged_task.task_id = task_id

    @parent_task = Task.find(task_id)
  end

  def create
    @logged_task = LoggedTask.new(logged_task_params)

    if @logged_task.save
      redirect_to @logged_task
    else
      render 'new'
    end
  end

  def show
    @logged_task = LoggedTask.find(params[:id])
    @logged_task_comment = Comment.new
  end

  private
    def logged_task_params
      params.require(:logged_task).permit(:task_id, :notes)
    end
end
