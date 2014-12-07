class AddFollowedIdToUserRelationship < ActiveRecord::Migration
  def change
    add_reference :user_relationships, :followed_user
  end
end
