class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.string :title
      t.datetime :time
      t.text :address
      t.text :other
      t.boolean :completed, default: false
      t.integer :size
      t.integer :creator_id, index: true
      t.references :caterogy_id

      t.timestamps
    end
  end
end
