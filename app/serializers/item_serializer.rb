class ItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :supplier_id, :category_id, :sale_id, :name, :description
end
