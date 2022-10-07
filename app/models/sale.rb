class Sale < ApplicationRecord
	belongs_to :item
	belongs_to :user
	belongs_to :customer
	has_many :categories, through: :items
	has_many :suppliers, through: :items
end
