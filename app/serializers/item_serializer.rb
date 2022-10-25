class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :price, :cost, :user_id, :supplier_id, :description, :image, :category_id, :no_to_sell
	# belongs_to :category
	# belongs_to :supplier
end
