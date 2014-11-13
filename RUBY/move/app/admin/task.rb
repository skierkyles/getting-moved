ActiveAdmin.register Task do
  permit_params :title, :user_id

  show do |task|
    attributes_table do
      row :title
      h4 "Logged Tasks"
      ul do
        task.logged_tasks.each do |lt|
          li lt.notes
        end
      end
    end
    active_admin_comments
  end

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if resource.something?
  #   permitted
  # end


end
