class ParkingSpot
  include Mongoid::Document
  validates_uniqueness_of :name
  has_many :reservations
  field :name, type: String
  field :occupied, type: Boolean
  field :reservable, type: Boolean
  field :reserved, type: Boolean
  
  before_update do
    
    ParkingSpot.all.each do |spot|
        @spot = spot if  self._id == spot._id
    end
    if @spot
      #raise Mongoid::Errors::Validations.new(self) if (self.reserved and @spot.reserved)
      #raise Mongoid::Errors::Validations.new(self) if (self.occupied and @spot.occupied)
      #raise Mongoid::Errors::Validations.new(self) if (self.reserved and not @spot.reservable)
    end
  end
end
