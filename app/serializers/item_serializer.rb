class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :price, :cost, :user_id, :supplier_id, :description, :image, :category_id
	# belongs_to :category
	# belongs_to :supplier
end
