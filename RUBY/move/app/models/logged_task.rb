class LoggedTask < ActiveRecord::Base
  belongs_to :task

  default_scope { order('created_at DESC') }
end
