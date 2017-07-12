FactoryGirl.define do
  factory :group_user, class: "GroupUsers" do
    group
    user
  end
end
