class WelcomeController < ApplicationController
  def index
    images = [
      ActionController::Base.helpers.asset_path("/welcome_images/1.jpg"),
      ActionController::Base.helpers.asset_path("/welcome_images/2.jpg"),
    ]

    @welcome_image = images.sample
  end
end
