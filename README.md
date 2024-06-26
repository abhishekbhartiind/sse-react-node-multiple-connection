## Install Project

```bash
# React
cd sse-client
npm i

# Node
cd sse-server
npm i
```

## Run the Project

```bash
# React
cd sse-client
npm start

# Node
cd sse-server
npm start | node server.js
```

# Fire an event

- Contains `clientId` and `message` to be send to fire an event

```bash

# client ID: 1719387748676
curl "http://localhost:3001/send-event?clientId=1719387748676&message=Hello%20Client%201719387748676"

# client ID: 1719387755186
curl "http://localhost:3001/send-event?clientId=1719387755186&message=Hello%20Client%201719387755186"
```
