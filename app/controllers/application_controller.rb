class ApplicationController < ActionController::API
	rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
	rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable

	private

	def render_not_found
		render json: {error: "We could not find what you are looking for"}, status: :not_found
	end

	def render_unprocessable(invalid)
		render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
	end
end
