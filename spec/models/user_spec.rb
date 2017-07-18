require "rails_helper"

RSpec.describe User, type: :model do
  describe "database structure" do
    it {is_expected.to have_db_column(:email).of_type(:string)}
    it {is_expected.to have_db_column(:encrypted_password).of_type(:string)}
    it {is_expected.to have_db_column(:authentication_token).of_type(:string)}
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

  describe "validations" do
    let(:user) {FactoryGirl.build :user}

    it "validate valid email" do
      expect(user).to be_valid
    end

    it "invalidate blank email" do
      user.email = ""
      expect(user).not_to be_valid
    end

    it "invalidate blank password" do
      user.password = ""
      expect(user).not_to be_valid
    end

    it "invalidtae short password" do
      user.password = "a"*5
      expect(user).not_to be_valid
    end


    it "invalidate different password confirmation" do
      user.password = "123456"
      user.password_confirmation = "654312"
      expect(user).not_to be_valid
    end

    it "invalidate wrong email format" do
      invalid_email = %w[foo@bar,com foo.bar foo@bar.baz.
        foo@bar_baz.com foo@bar+baz.com]
      invalid_email.each do |invalid_email|
        user.email = invalid_email
        expect(user).not_to be_valid
      end
    end

    it "invalidate long email" do
      user.email = "a"*42 + "@gmail.com"
      expect(user).not_to be_valid
    end

    it "validate uniqueness of email" do
      user.save
      user2 = FactoryGirl.build(:user)
      expect(user2).not_to be_valid
    end

    it "create profile for user" do
      user.save
      expect(Profile.count).to eq 1
    end

    it "assign default role for user" do
      user.save
      expect(user.roles.first.name).to eq "normal"
    end

    it "generate unique token" do
      user.save
      old_token = user.authentication_token
      user.generate_new_authentication_token
      new_token = user.authentication_token
      expect(new_token).not_to eq(old_token)
    end
  end
end
