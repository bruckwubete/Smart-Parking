# Smart Parking

[![Gem Version](https://badge.fury.io/rb/rails.svg)](https://badge.fury.io/rb/rails) [![npm version](https://badge.fury.io/js/angular.svg)](https://badge.fury.io/js/angular)

Smart Parking is a computer systems solution to today's urban area parking lot problems. This project aims to:

  - Reduce time and gas wasted driving around a parking lot looking for an available spot
  - Provide an easy to use, user friendly interface
  - Provide elevated access to primium users into the reserved section (see below)

### Running the application

The Smart Parking project is made up of three components
  - The smart parking board (not available here)
  - The ruby on rails server 
  - The Angular2 front end
  - The Adroid mobile application 
  
#### Running the ruby on rails server 
To run the ruby on rails server you need [Ruby](https://ruby-lang.org/) installed
```sh
git clone https://github.com/bruckwubete/Smart-Parking.git
cd Smart-Parking
```
You'll need to install the all dependencies for the smart parking app so run 

```sh
bundle install 
```

To run the app on a certain port, run the following command where <port> is the 
port you want to run it on   

```sh
rails s -b 0.0.0.0 --port <port> 
```

#### Running the Angular2 frontend
To run the ruby on rails server you need [Node.js](https://nodejs.org/) installed
Cd into the frontend folder
```sh
cd Smart-Parking/frontend
```
You'll need to install the all dependencies for the smart parking frontend app so run 

```sh
npm install 
```

To run the frontend app on a certain port, run the following command where <port> is the 
port you want to run it on   

```sh
ng serve --host 0.0.0.0 --port <port> 
```
finally if the previous commands worked fine go to http://localhost:<port>
and you should find something that looks like: 
![](frontend/src/assets/images/webapp_screenshot.jpg.png?raw=true)
### Development

Want to contribute?
Fully supported on cloud 9 

     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


### Aside
For this project to operate, 3 Raspberry Pis are required with access to the internet. Assuming that the Raspberry Pis are setup with a static IP address, the Raspberry Pis will need to use a Linux router in order to make HTTP requests. Additionally, the Raspberry Pi connected to the Arduino with the servo motor and the Raspberry Pi responsible for the QR scanning must be connected to the same router, as they communicate via wired UDP. To setup the internet access on the Raspberry Pis, type the following on a bash terminal on the host machine connected to the Linux router:
```sh
cd 
cat /etc/resolve.conf
```
Displayed on the terminal should now be a list of servers the Raspberry Pis could use. On the Raspberry Pi, open a bash terminal and type the following:
```sh
sudo -i
```
```sh
echo “nameserver <server>” >> /etc/resolv.conf
```
Where <server> is the information from the terminal on the host machine


License
----

MIT
