FactoryGirl.define do
  factory :restaurant do
    category
    manager {FactoryGirl.create :manager}
    title "Delicious"
    address "434 Tran Khat Chan"
    latitude 12.21262361
    longitude 50.13634645
    is_approved true
  end
end
