class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable

  # Relations
  has_many :tasks
  has_many :comments
  has_many :user_relationships

  # has_attached_file :avatar, :styles => { :large => "1000x1000>", :thumb => "200x200>" }, :default_url => "/images/:style/missing.png"

  # Validators
  # validates :name, presence: true, length: { maximum: 60 }

  def tasks_logged
    tasks = Task.where(:user => self)
    LoggedTask.where(:task_id => tasks)
  end

  def has_relationship_with? user
    rel = UserRelationship.find_by(:user => self, :followed_user => user)
  end
end
