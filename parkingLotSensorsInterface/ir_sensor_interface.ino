/*
  This script is written as a part of Smart Parking system built by Bruck Wubete, Sagar Patel and Akhil Marpadga for SYSC 3010
  It provides an interface to parking lot Infrared sensors placed on a demo board please see the Github repo for more information
  about the board.
*/

/*
 * @author Bruck Wubete
*/


#define LENGTH(s) (sizeof(s)/sizeof(*s))  


//We are using the lower two pins because we only go one 5v pin on the nano
boolean enableServo = true;

int lotPins[8] = {0,1,2,3,4,5,6,7};
int lotValues[8] = {0,0,0,0,0,0,0,0};
int previousLotValues[8] = {0,0,0,0,0,0,0,0};
int difference = 200;
//We need not continiously update the sensor value as it changes very fast
//for now we'll update sensor values every second
unsigned long sensorDelay = 1000;
//last time sensors were updated
unsigned long lastUpdateTime;
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);


}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pins sequentially:
  for(int index=0; index<LENGTH(lotValues); index++){
    lotValues[index] = analogRead(lotPins[index]);
  }
  for(int index=0; index<LENGTH(lotValues); index++){
    if(abs(lotValues[index]-previousLotValues[index])> difference){
      
      //Send Signal to RPI but for now blink a light
     // digitalWrite(lotPins[index], HIGH);
      Serial.println(index);
      updateSensorValue(index);
    }else{
      //Nothing to do here
     // digitalWrite(lotPins[index], LOW);
    }
  }
  
  //assign previous lot values the current lot values after sensorDelay has expired
  if(millis() - lastUpdateTime > sensorDelay){
    updateSensorValues();
    lastUpdateTime = millis();
  }
}

void updateSensorValues(){
  for(int index=0; index<LENGTH(previousLotValues); index++){
      previousLotValues[index] = lotValues[index];
    }
}

void updateSensorValue(int index){
  previousLotValues[index] = lotValues[index];
}