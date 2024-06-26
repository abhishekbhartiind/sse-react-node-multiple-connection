import React, { useState } from 'react';
import { EventSourceComponent } from './components';
import './App.css';

const App = () => {
  const [clientId, setClientId] = useState(Date.now());

  return (
    <div>
      <EventSourceComponent clientId={clientId} />
      <button onClick={() => setClientId(Date.now())}>New Client ID</button>
    </div>
  );
};

export default App;
