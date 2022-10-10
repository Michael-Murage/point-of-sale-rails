class Sale < ApplicationRecord
	has_many :items
	belongs_to :user
	belongs_to :customer
	has_many :categories, through: :items
	has_many :suppliers, through: :items
end
