class UpdateReservations < ApplicationMailer
    
    def update_reservation(user, reservation)
        @user = user
        @reservation = reservation
        @url  = 'http://example.com/login'
        mail(to: @user.email, subject: 'Please update your reservation')
    end
end
