class CreateVoucherCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :voucher_codes do |t|
      t.integer :group_id
      t.integer :voucher_id
      t.string :code

      t.timestamps
    end
  end
end
