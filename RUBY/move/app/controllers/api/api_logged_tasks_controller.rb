class ApiLoggedTasksController < ApiController
  def show
    logged_task = LoggedTask.find(params[:id])

    render :json=> {:success => true, :logged_task => logged_task.hashed}
  end
end
