class User < ApplicationRecord
	has_many :suppliers
	has_many :sales
	has_many :items
	has_many :customers, through: :sales
	has_many :categories, through: :items
	has_secure_password

	validates :name, presence: true
	validates :email, presence: true
	validates :name, uniqueness: true
	validates :email, uniqueness: true
end
