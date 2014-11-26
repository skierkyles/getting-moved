class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :copy
      t.references :logged_task, index: true

      t.timestamps
    end
  end
end
