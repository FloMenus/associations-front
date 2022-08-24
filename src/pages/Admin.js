import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";

function Admin() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("all");

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

  const filterMessages = (slug) => {
    setFilter(slug);
  };

  if (!messages) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <Navbar />
      <div className="flex gap-2 ml-5">
        <button onClick={() => filterMessages("all")} className="btn">
          All Messages
        </button>
        <button
          onClick={() => filterMessages("les-restos-du-coeur")}
          className="btn btn-ghost"
        >
          Les restos du coeur
        </button>
        <button
          onClick={() => filterMessages("unicef")}
          className="btn btn-ghost"
        >
          UNICEF
        </button>
        <button
          onClick={() => filterMessages("konexio")}
          className="btn btn-ghost"
        >
          Konexio
        </button>
      </div>
      {filter === "all" ? (
        <div className="flex flex-row flex-wrap gap-2.5 justify-center p-10">
          {messages.map((message) => (
            <div key={message.content} className="alert shadow-lg">
              <div className="flex flex-col justify-start align-start">
                <p>{message.time}</p>
                <h2>Name: {message.name}</h2>
                <h3>Association: {message.slug}</h3>
                <p>Content: {message.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-2.5 justify-center p-10">
          {messages
            .filter((message) => message.slug === filter)
            .map((message) => (
              <div key={message.content} className="alert shadow-lg">
                <div className="flex justify-start align-start">
                  <p>{message.time}</p>
                  <h2>Name: {message.name}</h2>
                  <h3>Association: {message.slug}</h3>
                  <p>Content: {message.content}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default Admin;
