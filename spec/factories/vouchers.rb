FactoryGirl.define do
  factory :voucher do
    restaurant
    from 2.days.ago
    to 2.days.from_now
    description "very good"
  end
end
