require 'rails_helper'

RSpec.describe ParkingSpot, type: :model do
  it "is creatable" do
    space1 = ParkingSpot.create!(name: "Space 1", occupied: false, reservable: false, reserved: false)
    expect(space1.name).to eq("Space 1")
    expect(space1.occupied).to eql(false)
    expect(space1.reservable).to eql(false)
    expect(space1.reserved).to eql(false)
  end
  
  it "reservable is creatable" do
    space1 = ParkingSpot.create!(name: "Space 1", occupied: false, reservable: true, reserved: false)
    expect(space1.name).to eq("Space 1")
    expect(space1.occupied).to eql(false)
    expect(space1.reservable).to eql(true)
    expect(space1.reserved).to eql(false)
  end
  
  it "must have a unique name" do
    space1 = ParkingSpot.create!(name: "Space 1", occupied: false, reservable: false, reserved: false)
	expect{ParkingSpot.create!(name: "Space 1", occupied: false, reservable: false, reserved: false)}.to raise_error(Mongoid::Errors::Validations)
  end
  
  it "is updateable" do
    space1 = ParkingSpot.create!(name: "Space 1", occupied: false, reservable: false, reserved: false)
	space1.update_attribute(:name, "Space 2")
	space1.save!
    expect(space1.name).to eq("Space 2")
  end
  
  it "can be reserved" do
    space1 = ParkingSpot.create!(name: "Space 1", occupied: false, reservable: true, reserved: false)
	space1.update_attribute(:reserved,true)
	expect(space1.reserved).to eql(true)
  end
  
  it "is already reserved" do
    space1 = ParkingSpot.create!(name: "Space 1", occupied: false, reservable: true, reserved: true)
    expect{space1.update_attribute(:reserved,true)}.to raise_error(Mongoid::Errors::Validations)
  end
  
  it "is available" do
	space1 = ParkingSpot.create!(name: "Space 1", occupied: false, reservable: false, reserved: false)
	space1.update_attribute(:occupied,true)
    expect(space1.occupied).to eql(true)
  end
  
  it "is already occupied" do
    space1 = ParkingSpot.create!(name: "Space 1", occupied: true, reservable: false, reserved: false)
	expect{space1.update_attribute(:occupied,true)}.to raise_error(Mongoid::Errors::Validations)
  end
  
  it "is unreservable" do
	space1 = ParkingSpot.create!(name: "Space 1", occupied: false, reservable: false, reserved: false)
	expect{space1.update_attribute(:reserved,true)}.to raise_error(Mongoid::Errors::Validations)
  end
end
