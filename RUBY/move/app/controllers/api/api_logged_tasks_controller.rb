class ApiLoggedTasksController < ApiController
  version 1

  def index
    expose LoggedTask.all
  end

  def show
    # Find the LoggedTasks related to the
    # Task that this id specifies.
    # TODO: Figure out how to expose more information related to this.
    expose LoggedTask.find(params[:id])
  end
end
