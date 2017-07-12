class CreateOpeningHours < ActiveRecord::Migration[5.1]
  def change
    create_table :opening_hours do |t|
      t.integer :restaurant_id
      t.time :from
      t.time :to
      t.integer :day_of_week

      t.timestamps
    end
  end
end
