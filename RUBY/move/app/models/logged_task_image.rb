class LoggedTaskImage < ActiveRecord::Base
  belongs_to :logged_task

  has_attached_file :image, :styles => { :large => "1000x1000#", :medium => "300x300#", :thumb => "100x100#" }, :convert_options => {:thumb => "-quality 50 -strip"}, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  def image_data=(data_value)
    puts "Image_data"
    puts data_value

    StringIO.open(Base64.strict_decode64(data_value)) do |data|
      data.class.class_eval { attr_accessor :original_filename, :content_type }
      data.original_filename = "base64ed#{DateTime.now.to_i}.jpeg"
      data.content_type = "image/jpeg" #TODO: get content type from file
      puts "About to assign"
      puts data
      self.image = data
      puts "Imagedddd"
      puts data
    end
  end

  def hashed
    {
      'id' => self.id,
      'image' => URI.join(ActionController::Base.asset_host, self.image.url).to_s,
      'thumb' => URI.join(ActionController::Base.asset_host, self.image.url(:thumb)).to_s,
    }
  end
end
