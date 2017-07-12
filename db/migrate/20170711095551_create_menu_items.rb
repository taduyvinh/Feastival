class CreateMenuItems < ActiveRecord::Migration[5.1]
  def change
    create_table :menu_items do |t|
      t.integer :menu_id
      t.string :name
      t.text :description
      t.string :image

      t.timestamps
    end
  end
end
