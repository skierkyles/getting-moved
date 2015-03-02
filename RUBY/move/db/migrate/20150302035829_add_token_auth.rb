class AddTokenAuth < ActiveRecord::Migration
  def change
    change_table(:users) do |t|
      ## Token authenticatable
      t.string :authentication_token
    end

    add_index :users, :authentication_token, :unique => true
  end
end
