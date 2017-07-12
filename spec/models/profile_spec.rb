require "rails_helper"

RSpec.describe Profile, type: :model do
  describe "database structure" do
    it {is_expected.to have_db_column(:user_id).of_type :integer}
    it {is_expected.to have_db_column(:name).of_type :string}
    it {is_expected.to have_db_column(:phonenumber).of_type :string}
    it {is_expected.to have_db_column(:birthday).of_type :datetime}
    it {is_expected.to have_db_column(:gender).of_type :integer}
    it {is_expected.to have_db_column(:job).of_type :string}
    it {is_expected.to have_db_column(:avatar).of_type :string}
    it {is_expected.to have_db_column(:description).of_type :text}
  end

  describe "association" do
    it {is_expected.to belong_to :user}
    it {is_expected.to have_many :reports}
  end
end
