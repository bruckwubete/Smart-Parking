json.extract! reservation, :id, :user_id, :parking_spot_id, :from, :to, :expired
json.url reservation_url(reservation, format: :json)
json.qr_code_path reservation.qr_code.barcode_path