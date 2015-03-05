class LoggedTask < ActiveRecord::Base
  # Relations
  belongs_to :task
  has_many :comments

  # Validators
  validates :notes, presence: true
  validates :task_date, presence: true

  default_scope { order('task_date DESC') }

  def hashed
    {:id => self.id, :notes => self.notes, :created_at => self.created_at,
    :updated_at => self.updated_at, :task_id => self.task_id, :task_date => self.task_date,
    :comments => self.comments}
  end
end
