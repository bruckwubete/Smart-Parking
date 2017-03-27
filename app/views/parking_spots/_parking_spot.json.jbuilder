json.extract! parking_spot, :id, :name, :occupied, :reservable, :reserved
json.url parking_spot_url(parking_spot, format: :json)
json.reservations parking_spot.reservations