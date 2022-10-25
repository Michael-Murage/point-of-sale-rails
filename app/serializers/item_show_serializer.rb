class ItemShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :price, :cost, :description, :image, :no_to_sell
	belongs_to :category
	belongs_to :supplier
end
