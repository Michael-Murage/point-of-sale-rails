class Api::UsersController < ApplicationController
	# skip_before_action :authorized, only: :create
	def create
		@user = User.new(user_params)
		# byebug
		if @user.save
			UserMailer.with(user: @user).new_user.deliver_now
			render json: {success: "User has been created"}
		else
			render json: {error: "There seems to be a problem with your request"}
		end
	end

	def show
		# byebug
		user = User.find(session[:user_id])
		render json: user, status: :created
	end

	def showUser
		user = User.find(params[:id])
		render json: user, status: :ok, serializer: UserShowSerializer
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
		params.permit(:name, :is_admin, :image, :password, :email)
	end
end
