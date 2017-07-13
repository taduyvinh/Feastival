require "rails_helper"

RSpec.describe MenuItem, type: :model do
  describe "ActiveRecord validations" do
    it {should have_db_column(:menu_id).of_type :integer}
    it {should have_db_column(:name).of_type :string}
    it {should have_db_column(:description).of_type :text}
    it {should have_db_column(:image).of_type :string}

    it {should belong_to :menu}
  end
end
