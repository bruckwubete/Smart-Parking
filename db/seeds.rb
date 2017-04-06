# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#parking spots seeds

   #seeding reserved parking spots
    ParkingSpot.create(name: "R1", reservable: true, reserved: false, occupied: false)
    ParkingSpot.create(name: "R2", reservable: true, reserved: false, occupied: false)
    ParkingSpot.create(name: "R3", reservable: true, reserved: false, occupied: false)
    ParkingSpot.create(name: "R4", reservable: true, reserved: false, occupied: false)
    ParkingSpot.create(name: "R5", reservable: true, reserved: false, occupied: false)
    ParkingSpot.create(name: "R6", reservable: true, reserved: false, occupied: false)
    
   #seeding regular parking spots
    
    ParkingSpot.create(name: "P1", reservable: false, reserved: false, occupied: false)
    ParkingSpot.create(name: "P2", reservable: false, reserved: false, occupied: false)
    ParkingSpot.create(name: "P3", reservable: false, reserved: false, occupied: false)
    ParkingSpot.create(name: "P4", reservable: false, reserved: false, occupied: false)
    ParkingSpot.create(name: "P5", reservable: false, reserved: false, occupied: false)
    ParkingSpot.create(name: "P6", reservable: false, reserved: false, occupied: false)
    ParkingSpot.create(name: "P7", reservable: false, reserved: false, occupied: false)
    ParkingSpot.create(name: "P8", reservable: false, reserved: false, occupied: false)