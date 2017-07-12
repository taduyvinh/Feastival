require "rails_helper"

RSpec.describe Group, type: :model do
  describe "database structure" do
    it {is_expected.to have_db_column(:category_id).of_type :integer}
    it {is_expected.to have_db_column(:restaurant_id).of_type :integer}
    it {is_expected.to have_db_column(:creator_id).of_type :integer}
    it {is_expected.to have_db_column(:title).of_type :string}
    it {is_expected.to have_db_column(:address).of_type :string}
    it {is_expected.to have_db_column(:time).of_type :datetime}
    it {is_expected.to have_db_column(:title).of_type :string}
    it {is_expected.to have_db_column(:latitude).of_type :float}
    it {is_expected.to have_db_column(:longitude).of_type :float}
    it {is_expected.to have_db_column(:size).of_type :integer}
    it {is_expected.to have_db_column(:status).of_type :boolean}
    it {is_expected.to have_db_column(:completed).of_type :boolean}
  end

  describe "association" do
    it {is_expected.to have_many :group_users}
    it {is_expected.to have_many :messages}
    it {is_expected.to have_many(:users).through :group_users}
    it {is_expected.to have_many(:vouchers).through :voucher_codes}
    it {is_expected.to have_many :voucher_codes}

    it {is_expected.to belong_to :category}
    it {is_expected.to belong_to :creator}
    it {is_expected.to belong_to :restaurant}
  end
end
