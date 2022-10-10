class Api::CategoriesController < ApplicationController
	# def index
	# 	render json: Category.all, status: :ok
	# end

	# def show
	# 	cat = find_cat
	# 	render json: cat, status: :ok
	# end

	# def create
	# 	cat = Category.create!(category_params)
	# 	render json: cat, status: :created
	# end

	# def update
	# 	cat = find_cat
	# 	cat.update!(category_params)
	# 	render json: cat, status: :accepted
	# end

	# def destroy
	# 	cat = find_cat
	# 	cat.destroy
	# 	render json: {}, status: :accepted
	# end

	private
	def find_cat
		Category.find(params[:id])
	end

	def category_params
		params.permit()
	end
end
