class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comments_params)

    @comment.save

    redirect_to @comment.logged_task
  end

  private
    def comments_params
      params.require(:comment).permit(:user_id, :logged_task_id, :copy)
    end
end
