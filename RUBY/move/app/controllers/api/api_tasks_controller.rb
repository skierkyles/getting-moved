class ApiTasksController < ApiController
	version 1

	def index
		expose Task.all
	end

	def show
		# Find the LoggedTasks related to the
		# Task that this id specifies.

		expose Task.find(params[:id]).logged_tasks
	end
end
