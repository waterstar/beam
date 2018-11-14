# beam demo mobile app and api server
## [ setup ]
### backend
1. git clone the project
2. cd to server and do a 'yarn' or 'npm install' (please ensure you have latest version of node)
3. run 'node apiserver.js'
### mobile
1. cd to mobile folder
2. do 'yarn' or 'npm install'
3. open a config file - app.json and change the "api_server" field your PC ip address
4. do 'npm run start' (if you have not install Expo, follow the instruction to install it)
5. a browser will be lauched with Expo console. 
6. Use your phone to scan the QR code. The QR is a shortcut to run the demo on your phone via Expo

## [ demo app ]
1. after the demo lauched, 50 scooters will be shown on a map (if the "api_server" in app.json is setup correctly).
2. tap on any of the scooter marker will pop up a modal that show the distance (to the scooter) and it serial number
3. tap on the 'you are here' marker will bring you to a list of dummy trip history page
4. zoom in futher if the marker and 'you are here' are too close to each other
