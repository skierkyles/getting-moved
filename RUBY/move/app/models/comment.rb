class Comment < ActiveRecord::Base
  belongs_to :logged_task
  belongs_to :user

  def hashed
    {
      'id' => self.id,
      'copy' => self.copy,
      'user' => self.user.found_name,
      'created_at' => self.created_at,
    }
  end
end
