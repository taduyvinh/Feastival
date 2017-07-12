require "rails_helper"

RSpec.describe Role, type: :model do
  describe "database column" do
    it {is_expected.to have_db_column(:resource_type).of_type :string}
    it {is_expected.to have_db_column(:resource_id).of_type :integer}
    it {is_expected.to have_db_column(:name).of_type :string}
  end

  describe "association" do
    it {is_expected.to have_many :users_roles}
    it {is_expected.to have_many(:users).through :users_roles}
    it {is_expected.to belong_to :resource}
  end

  describe "validations" do
    it {is_expected.to validate_inclusion_of(:resource_type).
      in_array Rolify.resource_types}
  end
end
