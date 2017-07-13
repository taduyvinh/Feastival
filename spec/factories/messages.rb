FactoryGirl.define do
  factory :message do
    user
    group
    content "abc"    
  end
end
