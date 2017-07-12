class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.integer :category_id
      t.integer :restaurant_id
      t.integer :creator_id
      t.string :title
      t.datetime :time
      t.string :address
      t.float :latitude
      t.float :longitude
      t.integer :size
      t.boolean :status
      t.boolean :completed
      t.text :description

      t.timestamps
    end
  end
end
