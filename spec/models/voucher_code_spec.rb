require "rails_helper"

RSpec.describe VoucherCode, type: :model do
  describe "ActiveRecord validations" do
    it {should have_db_column(:group_id).of_type :integer}
    it {should have_db_column(:voucher_id).of_type :integer}
    it {should have_db_column(:code).of_type :string}

    it {should belong_to :voucher}
    it {should belong_to :group}
  end
end
