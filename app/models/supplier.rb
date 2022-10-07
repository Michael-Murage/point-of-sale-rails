class Supplier < ApplicationRecord
	has_many :items
	belongs_to :user
	has_many :categories, through: :items
	has_many :sales, through: :items
end
