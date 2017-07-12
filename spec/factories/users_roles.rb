FactoryGirl.define do
  factory :users_role, class: "UsersRoles" do
    user
    role
  end
end
