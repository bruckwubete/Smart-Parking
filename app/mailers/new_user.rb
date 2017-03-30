class NewUser < ApplicationMailer
    default from: 't4@smartparking.com'
    def confirm_registration(user)
        @user = user
        mail(to: @user.email, subject: 'Please confirm your account')
    end
end
