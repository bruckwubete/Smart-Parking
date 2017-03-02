json.extract! parking_spot, :id, :name, :occupied, :reservable, :reserved, :created_at, :updated_at
json.url parking_spot_url(parking_spot, format: :json)