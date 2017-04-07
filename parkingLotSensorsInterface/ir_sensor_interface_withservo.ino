/*
  This script is written as a part of Smart Parking system built by Bruck Wubete, Sagar Patel and Akhil Marpadga for SYSC 3010
  It provides an interface to parking lot Infrared sensors placed on a demo board please see the Github repo for more information
  about the board.
*/

/*
 * @author Bruck Wubete
*/
#include <Servo.h>

#define LENGTH(s) (sizeof(s)/sizeof(*s))  
Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards

//We are using the lower two pins because we only go one 5v pin on the nano
boolean enableServo = true
int servoPowerPin = 5;

int pos = 0;    // variable to store the servo position
String inputString = "";  
int lotPins[6] = {0,1,2,3,4,5};
int lotValues[6] = {0,0,0,0,0};
int previousLotValues[6] = {0,0,0,0,0};
int difference = 200;
//We need not continiously update the sensor value as it changes very fast
//for now we'll update sensor values every second
unsigned long sensorDelay = 1000;
//last time sensors were updated
unsigned long lastUpdateTime;
void setup() {
  // initialize serial communication at 9600 bits per second:
  closeGate();
  Serial.begin(9600);
  // reserve 200 bytes for the inputString:
  inputString.reserve(200);

  pinMode(servoPowerPin, OUTPUT);
  digitalWrite(servoPowerPin, enableServo);
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

void closeGate(void){
  for (pos = 90; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
}

void openGate(void){
  for (pos = 180; pos >= 90; pos -= 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
  delay(6000);
  closeGate();
}

/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 */
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read();
    
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == 'o') {
      Serial.println(inChar);
      myservo.attach(9);
      openGate();
      myservo.detach();
    }
  }
}
