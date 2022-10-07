class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :is_admin
end
