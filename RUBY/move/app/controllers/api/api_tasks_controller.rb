class ApiTasksController < ApiController
	def index
		render :json=> {:success => true, :tasks => Task.all}
	end

	def show
		# Find the LoggedTasks related to the user id.

		user = User.find(params[:id])
		tasks = user.tasks

		hashes = []

		tasks.each do |t|
			hashes.push(t.hashed)
		end

		render :json=> {:success => true, :tasks => hashes}
	end
end
