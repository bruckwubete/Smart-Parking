class ParkingLot
  include Mongoid::Document
  field :name, type: String
  field :address, type: String
  field :city, type: String
  field :postal_code, type: String
  field :province, type: String
  field :country, type: String
  field :phone_number, type: String
end
