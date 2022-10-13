class Item < ApplicationRecord
	belongs_to :user
	belongs_to :supplier
	belongs_to :category
	has_many :sales

	validates :user_id, numericality: {greater_than: 0}
	validates :supplier_id, numericality: {greater_than: 0}
	validates :category_id, numericality: {greater_than: 0}
	validates :name, presence: true
	validates :quantity, numericality: {greater_than: 0}
	validates :price, numericality: {greater_than: 0}
	validates :cost, numericality: {greater_than: 0}
	validates :name, uniqueness: true
end
