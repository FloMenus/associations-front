import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";

function Admin() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchingMessages();
  }, []);

  const fetchingMessages = async () => {
    const request = await fetch(
      "http://localhost:8000/associations/messages/all/"
    );
    const response = await request.json();
    setMessages(response);
  };

  // reset messages to all messages
  const allMessages = async () => {
    const request = await fetch(
      "http://localhost:8000/associations/messages/all/"
    );
    const response = await request.json();
    setMessages(response);
  };

  // setState messages with localhost, then filter messages by slug, setState messages.
  const filterMessages = (slug) => {
    allMessages();
    const filteredMessages = messages.filter((message) => {
      return message.slug === slug;
    });
    setMessages(filteredMessages);
  };

  if (!messages) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Navbar />
      <button onClick={allMessages}>All Messages</button>
      <button onClick={() => filterMessages("les-restos-du-coeur")}>
        Les restos du coeur
      </button>
      <button onClick={() => filterMessages("unicef")}>UNICEF</button>
      <button onClick={() => filterMessages("konexio")}>Konexio</button>
      <div className="flex flex-row flex-wrap gap-2.5 justify-center p-10">
        {messages.map((message) => (
          <div className="alert shadow-lg">
            <div className="flex justify-start align-start">
              <p>{message.time}</p>
              <h2>Name: {message.name}</h2>
              <h3>Association: {message.slug}</h3>
              <p>Content: {message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Admin;
