class CreateLoggedTaskImages < ActiveRecord::Migration
  def change
    create_table :logged_task_images do |t|

      t.timestamps
    end
  end
end
