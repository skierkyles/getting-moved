class UserRelationship < ActiveRecord::Base
  # http://stackoverflow.com/questions/1888082/rails-association-for-two-foreign-keys-for-the-same-table-in-one-table
  belongs_to :user, :class_name => "User"
  belongs_to :followed_user, :class_name => "User", :foreign_key => "followed_user_id"
end
