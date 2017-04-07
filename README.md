# Smart Parking

[![Gem Version](https://badge.fury.io/rb/rails.svg)](https://badge.fury.io/rb/rails) [![npm version](https://badge.fury.io/js/angular.svg)](https://badge.fury.io/js/angular)

Smart Parking is a computer systems solution to today's urban area parking lot problems. This proects aims to:

  - Reduce time and ga wasted driving around a parking lot looking for an available spot
  - Provide an easy to use user friendly interface
  - Provide elevated access to primium users into the reserved section (see below)

### Installation

![](frontend/src/assets/images/component_dashboard.jpg?raw=true)


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
