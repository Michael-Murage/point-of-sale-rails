class SaleSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :customer_id
end
