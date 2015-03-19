class LoggedTaskImage < ActiveRecord::Base
  belongs_to :logged_task

  has_attached_file :image, :styles => { :large => "1000x1000", :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
end
