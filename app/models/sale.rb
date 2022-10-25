class Sale < ApplicationRecord
	has_many :items
	belongs_to :user
	belongs_to :customer
	has_many :categories, through: :items
	has_many :suppliers, through: :items

	validates :user_id, numericality: {greater_than: 0}
	# validates :items_sold, numericality: {greater_than: 0}
	validates :total, numericality: {greater_than: 0}
end
