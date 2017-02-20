/*
  This script is written as a part of Smart Parking system built by Bruck Wubete, Sagar Patel and Akhil Marpadga for SYSC 3010
  It provides an interface to parking lot Infrared sensors placed on a demo board please see the Github repo for more information
  about the board.
*/

/*
 * @author Bruck Wubete
*/


int lotPins[8] = {0,1,2,3,4,5,6,7};
int lotValues[8] = {0,0,0,0,0,0,0,0};
int previousLotValues[8] = {0,0,0,0,0,0,0,0};
int difference = 100;
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  for(int index=0; index<sizeof(lotPins); index++){
    pinMode(lotPins[index], OUTPUT);
  }
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pins sequentially:
  for(int index=0; index<sizeof(lotPins); index++){
    lotValues[index] = analogRead(lotPins[index]);
  }
  for(int index=0; index<sizeof(lotValues); index++){
    if(abs(lotValues[index]-previousLotValues[index])> difference){
      //Send Signal to RPI but for now blink a light
      digitalWrite(lotPins[index], HIGH);
    }else{
      //Nothing to do here
      digitalWrite(lotPins[index], LOW);
    }
  }
  //assign previous lot values the current lot values
  for(int index=0; index<sizeof(lotValues); index++){
    previousLotValues[index] = lotValues[index];
  }
}
