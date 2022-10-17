class ItemShowSerializer < ActiveModel::Serializer
  attributes :id, :category_id, :name, :image, :quantity, :price, :cost, :user_id, :supplier_id, :description
end
