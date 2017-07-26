FactoryGirl.define do
  factory :group do
    category
    restaurant
    creator {FactoryGirl.create :creator}
    title "Eating out"
    address "434 Tran Khat Chan"
    latitude 12.23346246
    longitude 50.13264364
    time 4.days.from_now
    status false
    completed false
  end
end
