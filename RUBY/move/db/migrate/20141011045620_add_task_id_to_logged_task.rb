class AddTaskIdToLoggedTask < ActiveRecord::Migration
  def change
    add_column :logged_tasks, :task_id, :integer
    add_index  :logged_tasks, :task_id
  end
end
