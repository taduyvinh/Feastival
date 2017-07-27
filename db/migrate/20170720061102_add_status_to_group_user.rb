class AddStatusToGroupUser < ActiveRecord::Migration[5.1]
  def change
    add_column :group_users, :status, :integer, default: 0
  end
end
