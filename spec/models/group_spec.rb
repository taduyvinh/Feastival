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

  describe "validations" do
    let(:group) {FactoryGirl.create :group}
    it "invalidate title" do
      group.title = ""
      expect(group).not_to be_valid
    end

    it "invalidate address" do
      group.address = ""
      expect(group).not_to be_valid
    end

    it "invalidate latitude" do
      group.latitude = ''
      expect(group).not_to be_valid
    end

    it "invalidate longitude" do
      group.longitude = ''
      expect(group).not_to be_valid
    end

    it "invalidate invalid time" do
      group.time = 2.days.ago
      expect(group).not_to be_valid
    end
  end
end
