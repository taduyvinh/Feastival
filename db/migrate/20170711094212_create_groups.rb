class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.integer :category_id
      t.integer :restaurant_id
      t.integer :creator_id
      t.string :title
      t.datetime :time
      t.string :address
      t.float :latitude, limit: 30
      t.float :longitude, limit: 30
      t.integer :size
      t.boolean :status, default: false
      t.boolean :completed, default: false
      t.text :description

      t.timestamps
    end
  end
end
