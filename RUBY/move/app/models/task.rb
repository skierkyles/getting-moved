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

  def hashed
    {:id => self.id, :title => self.title,
      :created_at => self.created_at, :updated_at => self.updated_at,
      :user_id => self.user_id, :logged_tasks => self.logged_tasks }
  end
end
