class ApiLoggedTasksController < ApiController
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }

  def show
    logged_task = LoggedTask.find(params[:id])

    render :json=> {:success => true, :logged_task => logged_task.hashed}
  end

  def create
    # task_id: 1
    # notes: We went skiing and stuff

    begin
      task = Task.find(params[:task_id])

      logged_task = LoggedTask.new
      logged_task.task = task
      logged_task.notes = params[:notes]
      logged_task.task_date = DateTime.now
      logged_task.save

      render :json => { :success => true, :logged_task => logged_task.hashed }
    rescue
      failure("Error")
    end

  end

  def failure(errors)
    return render json: { success: false, errors: errors }
  end
end
