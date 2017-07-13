require "rails_helper"

RSpec.describe Message, type: :model do
  describe "ActiveRecord validations" do
    it {should have_db_column(:user_id).of_type :integer}
    it {should have_db_column(:group_id).of_type :integer}
    it {should have_db_column(:content).of_type :string}

    it {should belong_to :user}
    it {should belong_to :group}
  end
end
