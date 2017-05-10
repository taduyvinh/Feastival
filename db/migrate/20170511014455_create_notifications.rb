class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.references :user
      t.text :content
      t.string :notification_type
      t.integer :notification_id

      t.timestamps
    end
  end
end
