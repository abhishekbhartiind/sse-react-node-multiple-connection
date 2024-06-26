const express = require('express');
const app = express();
const port = 3001;

let clients = [];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/events', (req, res) => {
  const clientId = req.query.clientId || Date.now(); // Using clientId from query params if provided, otherwise generate a new one

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const client = {
    id: clientId,
    res,
  };

  clients.push(client);

  req.on('close', () => {
    clients = clients.filter((c) => c.id !== clientId);
  });

  res.write(`data: {"message": "Connected with clientId ${clientId}"}\n\n`);
});

const sendEvent = (clientId, data) => {
  const client = clients.find((c) => c.id == clientId); // Note: use '==' for type coercion
  if (client) {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
  }
};

app.get('/send-event', (req, res) => {
  const { clientId, message } = req.query;

  sendEvent(clientId, { message });

  res.json({ status: 'Event sent' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
