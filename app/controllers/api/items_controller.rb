class Api::ItemsController < ApplicationController
	skip_before_action :authorized, only: [:index]
	def index
		item = Item.all
		render json: item, each_serializer: ItemShowSerializer, status: :ok
	end

	def show
		item = find_item
		render json: item, serializer: ItemShowSerializer, status: :ok
	end

	def create
		item = Item.create!(item_params)
		render json: item, status: :created
	end

	def update
		item = find_item
		item.update!(item_params)
		render json: item, status: :accepted
	end

	def update_quantity
		items = params[:items]
		for i in items
			temp = Item.find_by(name: i)
			temp.quantity -= 1
			temp.save
		end

		render json: {items: "edited successfully"}, status: :accepted
	end

	def destroy
		item = find_item
		item.destroy
		render json: {}, status: :accepted
	end

	private
	def find_item
		Item.find(params[:id])
	end

	def item_params
		params.permit(:user_id, :supplier_id, :category_id, :name, :description, :image, :quantity, :price, :cost)
	end
end
