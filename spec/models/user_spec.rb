require 'rails_helper'

RSpec.describe User, type: :model do
    
  it "Successfully creates a user" do
    andy = User.create!(username: "Andy", email: "andy@gmail.com", password: "123456")
    expect(andy.username).to eq("Andy")
    expect(andy.password).to eq("123456")
    expect(andy.email).to eq("andy@gmail.com")
  end
  
  it "Fails to create user with password less than 6 characters" do
    expect{User.create!(username: "Andy", email: "andy@gmail.com", password: "01234")}.to raise_error(Mongoid::Errors::Validations)
  end
  
  it "Fails to create user with identical emails" do
    andy = User.create!(username: "Andy", email: "andy@gmail.com", password: "123456")
    expect{User.create!(username: "Andy2", email: "andy@gmail.com", password: "-123456")}.to raise_error(Mongoid::Errors::Validations)
  end
  
  it "Fails to create user with username " do
    andy = User.create!(username: "Andy", email: "andy@gmail.com", password: "123456")
    expect{User.create!(username: "Andy", email: "andy2@gmail.com", password: "1234560")}.to raise_error(Mongoid::Errors::Validations)
  end
  
end
