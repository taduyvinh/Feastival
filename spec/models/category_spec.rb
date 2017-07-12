require "rails_helper"

RSpec.describe Category, type: :model do
  it {is_expected.to have_db_column(:name).of_type :string}
  it {is_expected.to have_many :restaurants}
  it {is_expected.to have_many :groups}
end
