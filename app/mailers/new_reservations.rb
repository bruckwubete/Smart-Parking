class NewReservations < ApplicationMailer
    
    def confirm_reservation(user, reservation)
        @user = user
        @reservation = reservation
        @url  = 'http://example.com/login'
        mail(to: @user.email, subject: 'Reservation confirmed')
    end
end
