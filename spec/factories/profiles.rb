FactoryGirl.define do
  factory :profile do
    user
    name "Sample User"
    birthday 20.years.ago
    phonenumber "0123456789"
    gender 1
  end
end
