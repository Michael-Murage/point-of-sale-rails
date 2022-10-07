class SupplierSerializer < ActiveModel::Serializer
  attributes :id, :location, :name, :schedule
end
