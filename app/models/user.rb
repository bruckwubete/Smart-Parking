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
  include Mongoid::Timestamps::Short
  has_many :reservations
  validates_uniqueness_of :email, :username
  #attr_accessible confirm_success_url
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, :authentication_keys => [:username, :email]
         
  include DeviseTokenAuth::Concerns::User
  after_create :send_confirmation_email, if: -> { !Rails.env.test? && User.devise_modules.include?(:confirmable) }


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
  
  def token_validation_response
      UserSerializer.root = false
      UserSerializer.new(self).as_json
  end
  
   def send_confirmation_email
    self.send_confirmation_instructions
  end
end
