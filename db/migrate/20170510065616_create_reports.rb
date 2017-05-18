class CreateReports < ActiveRecord::Migration[5.0]
  def change
    create_table :reports do |t|
      t.integer :reporter_id
      t.string :reported_type
      t.integer :reported_id
      t.text :content

      t.timestamps
    end
  end
end
