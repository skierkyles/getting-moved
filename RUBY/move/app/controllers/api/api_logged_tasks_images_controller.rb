class ApiLoggedTasksImagesController < ApiController
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }

  def create
    begin
      puts "Create Logged Image API"
      img = LoggedTaskImage.new
      img.logged_task_id = params[:logged_task_id]
      img.image_data = params[:image_data]

      puts img

      img.save()

      render :json => { :success => true }
    rescue Exception => e
      failure("Tried #{params[:logged_task_id]} but failed. #{e} !!!")
    end
  end

  def failure(errors)
    return render json: { success: false, errors: errors }
  end
end
