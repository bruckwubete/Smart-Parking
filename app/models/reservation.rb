class Reservation
  include Mongoid::Document
  belongs_to :user
  belongs_to :parking_spot
  field :from, type: Time
  field :to,    type: Time
  
  after_create :confirm
 

  @@REMINDER_TIME = 5.minutes # minutes before appointment

  # Notify our appointment attendee X minutes before the appointment time
  def reminder
    user = User.find(self.user_id);
    UpdateReservations.update_reservation(user, self).deliver_now
  end
  
  def confirm
    user = User.find(self.user_id);
    NewReservations.confirm_reservation(user, self).deliver_now
     @from = self.from
  @@to = self.to
    puts @@to
    reminder
  end

  def self.when_to_run
  
    @@to - @@REMINDER_TIME
  end

  handle_asynchronously :reminder, :run_at => Proc.new { self.when_to_run }
end
