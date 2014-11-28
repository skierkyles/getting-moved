class Task < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  # Relations
  has_many :logged_tasks
  belongs_to :user

  # Validators
  validates :title, presence: true
  validates :user_id, presence: true

  def time_since_last_logged
    if self.logged_tasks.first
      return time_ago_in_words(self.logged_tasks.first.created_at) + " ago"
    else
      return "Never"
    end
  end
end
