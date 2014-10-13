class User < ActiveRecord::Base
  # Validators
  validates :name, presence: true, length: { maximum: 60 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }

  # Normalize the emails to lowercase
  before_save { self.email = email.downcase }

  # Password things. Much secure
  has_secure_password
end
