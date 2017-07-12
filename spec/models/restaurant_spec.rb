require "rails_helper"

RSpec.describe Restaurant, type: :model do
  describe "database structure" do
    it {is_expected.to have_db_column(:category_id).of_type :integer}
    it {is_expected.to have_db_column(:manager_id).of_type :integer}
    it {is_expected.to have_db_column(:title).of_type :string}
    it {is_expected.to have_db_column(:address).of_type :text}
    it {is_expected.to have_db_column(:latitude).of_type :float}
    it {is_expected.to have_db_column(:longitude).of_type :float}
    it {is_expected.to have_db_column(:phonenumber).of_type :string}
    it {is_expected.to have_db_column(:website).of_type :string}
    it {is_expected.to have_db_column(:description).of_type :text}
    it {is_expected.to have_db_column(:is_approved).of_type :boolean}
  end

  describe "association" do
    it {is_expected.to belong_to :category}
    it {is_expected.to belong_to :manager}

    it {is_expected.to have_many :groups}
    it {is_expected.to have_many :menus}
    it {is_expected.to have_many(:opening_hours)}
    it {is_expected.to have_many(:vouchers)}
    it {is_expected.to have_many(:reports)}
  end
end
