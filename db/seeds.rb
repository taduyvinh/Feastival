# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

roles = %w(normal manager admin)
3.times {|role| Role.create name: roles[role]}


("a".."c").each do |user|
  User.create(
    email: "#{user}@gmail.com",
    password: "123456")
end

Category.create name: "Luxury"
Category.create name: "Bar/Pub"
Category.create name: "Buffet"
Category.create name: "Hot pot"
Category.create name: "Steak"
Category.create name: "Cafe/Dessert"
Category.create name: "Beer Club"


20.times do |i|
  User.create(
    email: "manager#{i}@gmail.com",
    password: "123456"
  ).add_role :manager
end

User.with_role(:manager).each do |manager|
  manager.create_restaurant(
    category_id: rand(1..6),
    title: Faker::Company.name,
    address: Faker::Address.street_address,
    is_approved: true,
    latitude: rand(21.021035..21.091035),
    longitude: rand(105.828001..105.8926236)
  )
end

Restaurant.where(id: 1..5).each do |restaurant|
  restaurant.groups.create(
    category_id: restaurant.category_id,
    creator_id: rand(1..3),
    title: Faker::Lorem.sentence,
    address: restaurant.address,
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    time: rand(5.days.from_now..10.days.from_now),
    size: rand(2..10),
    description: Faker::Lorem.paragraph
  )
end
