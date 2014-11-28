class LoggedTask < ActiveRecord::Base
  # Relations
  belongs_to :task
  has_many :comments

  # Validators
  validates :notes, presence: true

  default_scope { order('created_at DESC') }
end
