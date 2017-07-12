require "rails_helper"

RSpec.describe User, type: :model do
  describe "database structure" do
    it {is_expected.to have_db_column(:email).of_type(:string)}
    it {is_expected.to have_db_column(:encrypted_password).of_type(:string)}
  end

  describe "association" do
    it {is_expected.to have_many :created_groups}
    it {is_expected.to have_many :created_reports}
    it {is_expected.to have_many(:groups).through :group_users}
    it {is_expected.to have_many :messages}
    it {is_expected.to have_many :users_roles}
    it {is_expected.to have_many(:roles).through :users_roles}
    it {is_expected.to have_many :created_reports}
    it {is_expected.to have_one :profile}
    it {is_expected.to have_one :restaurant}
  end
end
