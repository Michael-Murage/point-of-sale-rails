class Api::SessionsController < ApplicationController
	skip_before_action :authorized, only: :create
	rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
	def create
		user = User.find_by(name: params[:name])
		if user&.authenticate(params[:password])
			session[:user_id] = user.id
			render json: user, status: :created
		else
			render json: {errors: ["Invalid username or password"]}, status: :unauthorized
		end
	end

	def destroy
		session.delete :user_id
		head :no_content
	end

	private

	def render_not_found
		render json: {errors: ["Not authorized"]}, status: :unauthorized
	end
end
