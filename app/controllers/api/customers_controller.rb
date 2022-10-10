class Api::CustomersController < ApplicationController
	# def index
	# 	render json: Customer.all, status: :ok
	# end

	# def show
	# 	cust = find_cust
	# 	render json: cust, status: :ok
	# end

	# def create
	# 	cust = Customer.create!(customer_params)
	# 	render json: cust, status: :created
	# end

	# def update
	# 	cust = find_cust
	# 	cust.update!(customer_params)
	# 	render json: cust, status: :accepted
	# end

	# def destroy
	# 	cust = find_cust
	# 	cust.destroy
	# 	render json: {}, status: :accepted
	# end

	private
	def find_cust
		Customer.find(params[:id])
	end

	def customer_params
		params.permit()
	end
end
