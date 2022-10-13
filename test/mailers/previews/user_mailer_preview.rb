# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
	def new_user
		user = User.new(name: "Justus", password: "12345678", email: "mickeymurage@gmail.com")
		# byebug
		UserMailer.with(user: user).new_user
	end
end
