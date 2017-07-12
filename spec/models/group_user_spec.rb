require "rails_helper"

RSpec.describe GroupUser, type: :model do
  describe "association" do
    it {is_expected.to belong_to :group}
    it {is_expected.to belong_to :user}
  end

  describe "database structure" do
    it {is_expected.to have_db_column(:user_id).of_type :integer}
    it {is_expected.to have_db_column(:group_id).of_type :integer}
  end
end
