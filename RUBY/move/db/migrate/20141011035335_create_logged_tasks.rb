class CreateLoggedTasks < ActiveRecord::Migration
  def change
    create_table :logged_tasks do |t|
      t.text :notes

      t.timestamps
    end
  end
end
