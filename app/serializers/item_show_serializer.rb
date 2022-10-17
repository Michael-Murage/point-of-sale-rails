class ItemShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :price, :cost, :description, :image
	belongs_to :category, serializer: CategoryShowSerializer
	belongs_to :supplier, serializer: SupplierShowSerializer
end
