class SupplierSerializer < ActiveModel::Serializer
  attributes :id, :location, :name, :schedule, :image
end
