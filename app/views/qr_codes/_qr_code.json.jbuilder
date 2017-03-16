json.extract! qr_code, :id, :barcode_path, :user_id
json.url qr_code_url(qr_code, format: :json)