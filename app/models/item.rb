class Item < ApplicationRecord
	belongs_to :user
	belongs_to :supplier
	belongs_to :category
	has_many :sales
end
