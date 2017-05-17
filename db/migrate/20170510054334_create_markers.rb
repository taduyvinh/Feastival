class CreateMarkers < ActiveRecord::Migration[5.0]
  def change
    create_table :markers do |t|
      t.float :longitude
      t.float :latitude
      t.integer :address
      t.references :group

      t.timestamps
    end
  end
end
