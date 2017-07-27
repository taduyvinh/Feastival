class AddIndexToGroupUser < ActiveRecord::Migration[5.1]
  def change
    add_index :group_users, :group_id
    add_index :group_users, :user_id
    add_index :group_users, [:user_id, :group_id]
  end
end
