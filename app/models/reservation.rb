class Reservation
  include Mongoid::Document
  belongs_to :user
  belongs_to :parking_spot
  has_one :qr_code
  
  #properties
  field :from, type: Time
  field :to,    type: Time
  field :expired, type: Boolean, default: false
  
  after_create do
    generate_barcode
    confirm
  end
 
  @@REMINDER_TIME = 5.minutes # minutes before reservation

  # Notify our reservation attendee X minutes before the reservation time
  def reminder
    @user = User.find(self.user_id);
    UpdateReservations.update_reservation(user, self).deliver_now
  end
  
  # Expire reservation when to time is reached
  def expire
    @parking_spot = ParkingSpot.find(self.parking_spot_id)
    @parking_spot.reserved = false
    @parking_spot.save!
    self.expired = true
    self.save!
  end
  
  def generate_barcode
     #create a barcode for this reservation
     @qr_code = QrCode.new
     barcode = RQRCode::QRCode.new(self.id.to_s)
     png = barcode.as_png(
         resize_gte_to: false,
         resize_exactly_to: false,
         fill: 'white',
         color: 'black',
         size: 250,
         border_modules: 4,
         module_px_size: 10,
         file: nil # path to write
         )
     @qr_code.barcode_path =  '/qr_codes/' + self.id.to_s + '.png'
     @qr_code.save!
     self.qr_code = @qr_code
     self.save!
     
     begin
         File.open( 'public' + @qr_code.barcode_path, 'wb') {|f| f.write png }
     rescue
        raise "ERROR: Failed to open barcode with path" + @qr_code.barcode_path
     end
     
     mark_parking_spot_as_reserved
     
  end
  
  
  def confirm
    user = User.find(self.user_id);
    NewReservations.confirm_reservation(user, self).deliver_now
    @from = self.from
    @@to = self.to

    reminder
    expire
  end

  def self.when_to_remind
    @@to - @@REMINDER_TIME
  end
  
  def self.when_to_expire
    @@to
  end

  handle_asynchronously :reminder, :run_at => Proc.new { self.when_to_remind }
  handle_asynchronously :expire, :run_at => Proc.new { self.when_to_expire}
  
  private 
  
  def mark_parking_spot_as_reserved
    @parking_spot = ParkingSpot.find(self.parking_spot_id)
    @parking_spot.reserved = true
    @parking_spot.save!
  end
end
