require "rails_helper"

RSpec.describe Report, type: :model do
  describe "ActiveRecord validations" do
    it {should have_db_column(:reporter_id).of_type :integer}
    it {should have_db_column(:reported_id).of_type :integer}
    it {should have_db_column(:reported_type).of_type :string}
    it {should have_db_column(:content).of_type :string}

    it {should belong_to(:reporter).class_name User.name}
    it {should belong_to :reported}
  end
end
