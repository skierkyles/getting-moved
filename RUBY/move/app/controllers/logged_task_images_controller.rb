class LoggedTaskImagesController < ApplicationController
  def create
    puts "LoggedTaskImagesController create!"
    @image = LoggedTaskImage.new(image_params)
    puts image_params

    @image.save

    redirect_to @image.logged_task
  end

  private
    def image_params
      params.require(:logged_task_image).permit(:logged_task_id, :image)
    end
end
