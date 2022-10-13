class Api::AuthController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_logged_in
	def authorize
		user = User.find(session[:user_id])
		if user.is_admin == true
			render json: {success: 'authorized'}, status: :accepted
		else
			render json: {errors: ["Not authorized"]}, status: :unauthorized
		end
	end

	private

	def render_not_logged_in
		render json: "You are not logged in", status: :not_found
	end
end
