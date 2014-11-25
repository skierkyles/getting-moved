class User < ActiveRecord::Base
  # Relations
  has_many :tasks

  # Validators
  validates :name, presence: true, length: { maximum: 60 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }

  # Normalize the emails to lowercase
  before_save { self.email = email.downcase }

  # User persistence
  before_create :create_remember_token

  # Password things. Much secure
  has_secure_password

  def User.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def User.digest(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  def logged_tasks
    logged = []

    self.tasks.each do |t|
      logged += t.logged_tasks.count
    end

  end

  private
    def create_remember_token
      self.remember_token = User.digest(User.new_remember_token)
    end
end
