require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "new user" do
    # Set up an order based on the fixture
    user = users(:one)

    # Set up an email using the order contents
    email = UserMailer.with(user: user).new_user

    # Check if the email is sent
    assert_emails 1 do
      email.deliver_now
    end

    # Check the contents are correct
    assert_equal 'michael.murage@student.moringaschool.com', email.from
    assert_equal 'michael.murage@student.moringaschool.com', email.to
    assert_equal "You got a new order!", email.subject
    assert_match user.name, email.html_part.body.encoded
    assert_match user.name, email.text_part.body.encoded
    assert_match user.email, email.html_part.body.encoded
    assert_match user.email, email.text_part.body.encoded
    assert_match user.password, email.html_part.body.encoded
    assert_match user.password, email.text_part.body.encoded
  end
end
