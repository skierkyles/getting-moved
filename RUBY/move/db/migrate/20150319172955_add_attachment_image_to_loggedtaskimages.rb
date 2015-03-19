class AddAttachmentImageToLoggedtaskimages < ActiveRecord::Migration
  def self.up
    change_table :logged_task_images do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :logged_task_images, :image
  end
end
