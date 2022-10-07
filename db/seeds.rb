# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

category = %w!cosmetics hair perfumes others!
location = %w!Kericho Nakuru Nairobi Eldoret!
schedule = %w!Mondays Tuesdays Wednesdays Thursdays Fridays Weekends!
items = %w!Angels_braids Darling_braids Sugar_baby Polo_sport Pink_chiffon Escada_taj Moulding_gel Refill_bottles Al_rehab_perfumes Rexona_rollons!

puts "Seeding data..."
for i in 0..category.size
	Category.create(name: category[i])
	Customer.create(name: Faker::Name.name)
	User.create(name: Faker::Name.name)
end
Customer.create(name: 'others')

for i in 0..schedule.size
	Supplier.create(
		name: Faker::Name.name,
		location: location[rand(1..4)],
		schedule: schedule[i],
		user_id: rand(1..4),
		image: Faker::Company.logo
	)
end

for i in 0..items.size
	Item.create(
		user_id: rand(1..4),
		supplier_id: rand(1..6),
		category_id: rand(1..4),
		name: items[i],
		description: Faker::Lorem.sentence(word_count: rand(6..10)),
		quantity: rand(1..40),
		image: Faker::LoremPixel.image(size: "100x100")
	)
end

10.times{
	Sale.create(
		user_id: rand(1..4),
		customer_id: rand(1..5),
		comment: Faker::Lorem.sentence(word_count: rand(1..4)),
		item_id: rand(1..10)
	)
}
puts "...done seeding."