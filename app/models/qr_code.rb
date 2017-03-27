class QrCode
  include Mongoid::Document
  belongs_to :reservation
  field :barcode_path, type: String
end
