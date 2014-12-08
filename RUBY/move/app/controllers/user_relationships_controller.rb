class UserRelationshipsController < ApplicationController
  def new
    followed_id = params[:followed_id]

    @relationship = UserRelationship.new
    @followed_user = User.find(followed_id)
    @relationship.followed_user = @followed_user
    @relationship.user = current_user

    @relationship.save

    redirect_to @followed_user
  end

  def destroy
    @relationship = UserRelationship.find(params[:id])
    @followed_user = @relationship.followed_user

    @relationship.destroy

    redirect_to @followed_user
  end
end
