class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :edit, :update, :destroy]

  # GET /reservations
  # GET /reservations.json
  def index
    @reservations = Reservation.all
  end

  # GET /reservations/1
  # GET /reservations/1.json
  def show
  end

  # GET /reservations/new
  def new
    @reservation = Reservation.new
  end

  # GET /reservations/1/edit
  def edit
  end

  # POST /reservations
  # POST /reservations.json
  def create
    from_time = Time.find_zone(Time.zone).local(reservation_params[:from][:year], reservation_params[:from][:month], reservation_params[:from][:day], 
                                         reservation_params[:from][:hour], reservation_params[:from][:minute], reservation_params[:from][:second])
    
    to_time = Time.find_zone(Time.zone).local(reservation_params[:to][:year], reservation_params[:to][:month], reservation_params[:to][:day], 
                                         reservation_params[:to][:hour], reservation_params[:to][:minute], reservation_params[:to][:second])
                                         

    raise "ERROR: cannot book past time" if Time.zone.now > from_time || from_time >= to_time
   
    @reservation = Reservation.new(user_id: reservation_params[:user_id],
                                   parking_spot_id: reservation_params[:parking_spot_id],
                                   from: from_time,
                                   to: to_time)

    respond_to do |format|
      if @reservation.save
        format.html { redirect_to @reservation, notice: 'Reservation was successfully created.' }
        format.json { render :show, status: :created, location: @reservation }
      else
        format.html { render :new }
        format.json { render json: @reservation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reservations/1
  # PATCH/PUT /reservations/1.json
  def update
    respond_to do |format|
      if @reservation.update(reservation_params)
        format.html { redirect_to @reservation, notice: 'Reservation was successfully updated.' }
        format.json { render :show, status: :ok, location: @reservation }
      else
        format.html { render :edit }
        format.json { render json: @reservation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reservations/1
  # DELETE /reservations/1.json
  def destroy
    @reservation.destroy
    respond_to do |format|
      format.html { redirect_to reservations_url, notice: 'Reservation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  
  def get_parking_spot_reservations
    @reservations = ParkingSpot.find(params[:parking_spot_id]).reservations
    render 'reservations/index'
  end
  
  def get_user_reservations
    @reservations = User.find(params[:user_id]).reservations
    render 'reservations/index'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def reservation_params
      params.permit(:user_id, :expired, :parking_spot_id, from: [:year,:month,:day,:hour,:minute,:second], to: [:year,:month,:day,:hour,:minute,:second])
    end
end
