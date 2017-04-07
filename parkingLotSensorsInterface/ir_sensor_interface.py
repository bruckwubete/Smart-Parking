import serial
import urllib2
from time import sleep
from random import randint

ser1 = serial.Serial('/dev/ttyACM0',9600)

while True:
    spot = randint(1,8);
    if(rand(0,1)):
        ser.write(bsrt(spot))
    sleep(randint(1,1000))
    

