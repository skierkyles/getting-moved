class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable

  # Relations
  has_many :tasks
  has_many :comments
  has_many :user_relationships

  has_attached_file :avatar, :styles => { :large => "1000x1000#", :medium => "500x500#", :thumb => "200x200#" }, :default_url => "/images/avatars/:style/missing.gif"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  # Validators
  # validates :name, presence: true, length: { maximum: 60 }

  def found_name
    if self.name != nil
      self.name
    else
      self.email
    end
  end

  def tasks_logged
    tasks = Task.where(:user => self)
    LoggedTask.where(:task_id => tasks)
  end

  def has_relationship_with? user
    rel = UserRelationship.find_by(:user => self, :followed_user => user)
  end
end
