require "rails_helper"

RSpec.describe Menu, type: :model do
  describe "ActiveRecord validations" do
    it {should have_db_column(:restaurant_id).of_type :integer}
    it {should have_db_column(:name).of_type :string}
    it {should have_db_column(:description).of_type :text}
    it {should have_db_column(:image).of_type :string}

    it {should have_many(:menu_items).dependent :destroy}

    it {should belong_to :restaurant}
  end
end
