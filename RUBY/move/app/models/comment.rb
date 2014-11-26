class Comment < ActiveRecord::Base
  belongs_to :logged_task
  belongs_to :user
end
