class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.integer :category_id
      t.integer :manager_id
      t.string :title
      t.text :address
      t.float :latitude
      t.float :longitude
      t.text :description
      t.string :phonenumber
      t.string :website
      t.boolean :is_approved

      t.timestamps
    end
  end
end
