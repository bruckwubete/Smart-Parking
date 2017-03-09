class QrCode
  include Mongoid::Document
  belongs_to :user
  field :barcode_path, type: String
end
