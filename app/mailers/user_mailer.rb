class UserMailer < ApplicationMailer
	def new_user
		@user = params[:user]
		
		mail(to: @user[:email], subject: "Login info")
	end
end
