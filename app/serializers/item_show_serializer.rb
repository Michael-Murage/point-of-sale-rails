class ItemShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :price, :cost, :description, :image
	belongs_to :category
	belongs_to :supplier
end
