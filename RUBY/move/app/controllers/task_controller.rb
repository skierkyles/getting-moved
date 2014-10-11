class TaskController < ApplicationController

  private
    def task_params
      params.require(:task).permit(:title)
    end
end
