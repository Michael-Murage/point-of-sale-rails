class Api::ItemsController < ApplicationController
	def index
		render json: Item.all, status: :ok
	end

	def show
		item = find_item
		render json: item, status: :ok
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
		params.permit()
	end
end
