class ItemSerializer < ActiveModel::Serializer
  attributes :id, :category_id, :name, :image, :quantity, :price, :cost
	# :user_id, :supplier_id, :description,
	belongs_to :category
	belongs_to :supplier
end
