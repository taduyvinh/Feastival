FactoryGirl.define do
  factory :report do
    user
    profile
    report_type "Wrong content"
    content "Content"
  end
end
