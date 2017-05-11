class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.string :name
      t.date :birthday
      t.integer :gender
      t.text :address
      t.string :job
      t.string :phonenumber
      t.string :avatar
      t.text :description
      t.references :user

      t.timestamps
    end
  end
end
