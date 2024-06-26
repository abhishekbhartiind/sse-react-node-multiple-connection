import React, { useEffect, useState } from 'react';

const EventSourceComponent = ({ clientId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3001/events?clientId=${clientId}`);

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      eventSource.close();
    };
  }, [clientId]);

  return (
    <div>
      <h2>Messages for Client {clientId}</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventSourceComponent;
