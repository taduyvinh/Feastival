class CreateMenus < ActiveRecord::Migration[5.1]
  def change
    create_table :menus do |t|
      t.integer :restaurant_id
      t.string :name
      t.text :description
      t.string :image

      t.timestamps
    end
  end
end
