class Task < ActiveRecord::Base
  has_many :logged_tasks
end
