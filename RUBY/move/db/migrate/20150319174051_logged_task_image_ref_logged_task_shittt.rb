class LoggedTaskImageRefLoggedTaskShittt < ActiveRecord::Migration
  def change
    change_table :logged_task_images do |t|
      t.references :logged_task, index: true
    end
  end
end
