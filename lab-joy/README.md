# Lab 06 - TCP Chat Server
Joy Hou, January 22, 2018

## Modules

### Client
The client module exports a function that takes in one parameter, the socket. It uses the UUID library to create a user ID and assigns a nickname based on Math.random().

### Commands
The commands module exports a function that takes in four parameters, the message that the user input, the socket, the client object, and the clientPool array. It checks to see if the message starts with "@." If so, it checks if it matches any of the predefined commands and takes the appropriate action. If the message starts with @ and the command is not a predefined command, it returns a message that the command is invalid.

## Server
The server module creates a server that runs our chat application and listens for the defined port. It creates an array, clientPool, that contains client objects. When a client connects, it sends a welcome message to the client with a list of commands. It adds the client ot the clientPool array of connected users. It handles the client inputs and outputs it to the other connected users. It calls the command function to handle command inputs. When the client exits the connection, the function removes the client from the clientPool.

## How To: Starting the Server & Connection
1. Git clone this repository

2. From your terminal in the lab-joy folder, run "node server.js"

3. From separate terminals, you can connect to the server via the command "nc localhost 3000"