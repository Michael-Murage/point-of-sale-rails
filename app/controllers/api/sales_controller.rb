class Api::SalesController < ApplicationController
	# def index
	# 	render json: Sale.all, status: :ok
	# end

	# def show
	# 	sale = find_sale
	# 	render json: sale, status: :ok
	# end

	def create
		sale = Sale.create(sale_params)
		render json: sale, status: :created
	end

	# def destroy
	# 	sale = find_sale
	# 	sale.destroy
	# 	render json: {}, status: :accepted
	# end

	private
	def find_sale
		Sale.find(params[:id])
	end

	def sale_params
		params.permit(:user_id, :customer_id, :items_sold, :total)
	end
end
