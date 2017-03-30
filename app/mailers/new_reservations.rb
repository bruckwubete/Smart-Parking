class NewReservations < ApplicationMailer
    default from: 't4@smartparking.com'
    def confirm_reservation(user, reservation)
        @user = user
        @reservation = reservation
        @url  = 'http://example.com/login'
        mail(to: @user.email, subject: 'Reservation confirmed')
    end
end
