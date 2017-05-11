class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, index: {unique: true}
      t.string :password_digest
      t.boolean :is_admin, default: false

      t.timestamps
    end
  end
end
