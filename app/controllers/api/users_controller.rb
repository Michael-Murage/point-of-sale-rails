class Api::UsersController < ApplicationController
	skip_before_action :authorized, only: :create
	def create
		user = User.create!(user_params)
		session[:user_id] = user.id
		render json: user, status: :created
	end

	def show
		# byebug
		user = User.find(session[:user_id])
		render json: user, status: :created
	end



	def index
		render json: User.all, status: :ok
	end

	def update
		user = find_user
		user.update!(user_params)
		render json: user, status: :accepted
	end

	def destroy
		user = find_user
		user.destroy
		render json: {}, status: :accepted
	end

	private
	def find_user
		User.find(params[:id])
	end

	def user_params
		params.permit(:name, :is_admin, :image, :password, :password_confirmation)
	end
end
