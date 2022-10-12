class SaleSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :customer_id, :items_sold, :total, :created_at
	belongs_to :user
	belongs_to :customer
end
