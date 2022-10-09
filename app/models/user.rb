class User < ApplicationRecord
	has_many :suppliers
	has_many :sales
	has_many :items
	has_many :customers, through: :sales
	has_many :categories, through: :items
	has_secure_password
end
