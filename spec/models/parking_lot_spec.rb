require 'rails_helper'

RSpec.describe ParkingLot, type: :model do
  it "Successfully creates a parking lot " do
    t4_lot = ParkingLot.create!(name: "T4", address: "979 eiffle ave", city: "Ottawa", postal_code:"K2C0J3", province:"ON",
                                country: "Canada", phone_number:"613-315-8975")
    expect(t4_lot.name).to eq("T4")
    expect(t4_lot.address).to eq("979 eiffle ave")
    expect(t4_lot.city).to eq("Ottawa")
    expect(t4_lot.postal_code).to eq("K2C0J3")
    expect(t4_lot.province).to eq("ON")
    expect(t4_lot.country).to eq("Canada")
    expect(t4_lot.phone_number).to eq("613-315-8975")
  end
end
