class User
   # Get rid of devise-token_auth issues from activerecord
  def self.table_exists?
    true
  end

  def self.columns_hash
    # Just fake it for devise-token-auth; since this model is schema-less, this method is not really useful otherwise
    {} # An empty hash, so tokens_has_json_column_type will return false, which is probably what you want for Monogoid/BSON
  end

  def self.serialize(*args)

  end
  include Mongoid::Document
  #include DeviseTokenAuth::Concerns::User
  include Mongoid::Timestamps::Short
  has_one :qr_code
  validates_uniqueness_of :email, :username
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable
         
  include DeviseTokenAuth::Concerns::User
  
  after_create do
      @qr_code = QrCode.new
       barcode = RQRCode::QRCode.new(self.id.to_s)
       png = barcode.as_png(
           resize_gte_to: false,
           resize_exactly_to: false,
           fill: 'white',
           color: 'black',
           size: 500,
           border_modules: 4,
           module_px_size: 10,
           file: nil # path to write
           )
       @qr_code.barcode_path =  'public/qr_codes/' + self.id.to_s
       @qr_code.save!
       self.qr_code = @qr_code
       self.save!
       File.open( @qr_code.barcode_path + '.png', 'wb') {|f| f.write png }
  end


  ## Database authenticatable
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time
  
  ## unique oauth id
  field :provider, type: String
  field :uid, default: ""
  
  #Tokens
  field :tokens, type: Hash, default: { }

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  ## Confirmable
   field :confirmation_token,   type: String
   field :confirmed_at,         type: Time
   field :confirmation_sent_at, type: Time
   field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
   #field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
   #field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time
  # field :with_lock,       type: String, default: ""
  
  ## User Info
  field :username, type: String, default: ""
end
