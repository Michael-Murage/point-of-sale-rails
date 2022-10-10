class SaleSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :customer_id, :items_sold, :total
end
