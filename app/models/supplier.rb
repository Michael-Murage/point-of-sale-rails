class Supplier < ApplicationRecord
	has_many :items
	belongs_to :user
	has_many :categories, through: :items
	has_many :sales, through: :items

	# validates :user_id, numericality: {greater_than: 0}
	# validates :name, presence: true
end
