class CreateVouchers < ActiveRecord::Migration[5.1]
  def change
    create_table :vouchers do |t|
      t.integer :restaurant_id
      t.datetime :from
      t.datetime :to
      t.text :description
      t.string :image

      t.timestamps
    end
  end
end
