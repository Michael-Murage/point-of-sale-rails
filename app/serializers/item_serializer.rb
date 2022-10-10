class ItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :supplier_id, :category_id, :name, :description, :image, :quantity, :price, :cost
	belongs_to :category
	belongs_to :supplier
end
