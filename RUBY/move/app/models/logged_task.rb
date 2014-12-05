class LoggedTask < ActiveRecord::Base
  # Relations
  belongs_to :task
  has_many :comments

  # Validators
  validates :notes, presence: true
  validates :task_date, presence: true

  default_scope { order('task_date DESC') }
end
