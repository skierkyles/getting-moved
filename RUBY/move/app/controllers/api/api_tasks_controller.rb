class ApiTasksController < ApiController
	version 1

	def index
		expose Task.all
	end

	def show
		# Find the LoggedTasks related to the
		# Task that this id specifies.
		# TODO: Figure out how to expose more information related to this.
		puts Task.find(params[:id]).logged_tasks
		resource Task.find(params[:id])
	end
end
