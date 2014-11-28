class AddTaskDateToLoggedTasks < ActiveRecord::Migration
  def change
    add_column :logged_tasks, :task_date, :date
  end
end
