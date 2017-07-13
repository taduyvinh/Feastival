require "rails_helper"

RSpec.describe Voucher, type: :model do
  describe "ActiveRecord validations" do
    it {should have_db_column(:restaurant_id).of_type :integer}
    it {should have_db_column(:from).of_type :datetime}
    it {should have_db_column(:to).of_type :datetime}
    it {should have_db_column(:description).of_type :text}
    it {should have_db_column(:image).of_type :string}

    it {should have_many(:groups).through(:voucher_codes)}
    it {should have_many(:voucher_codes).dependent :destroy}
  end
end
