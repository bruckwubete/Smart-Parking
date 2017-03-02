class ParkingSpot
  include Mongoid::Document
  field :name, type: String
  field :occupied, type: String
  field :reservable, type: String
  field :reserved, type: String
end
