class LoggedTask < ActiveRecord::Base
  belongs_to :task
  has_many :comments

  default_scope { order('created_at DESC') }
end
