class Task < ActiveRecord::Base
  # Relations
  has_many :logged_tasks
  belongs_to :user

  # Validators
  validates :title, presence: true
  validates :user_id, presence: true
end
