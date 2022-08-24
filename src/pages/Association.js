import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";

function Association() {
  const { slug } = useParams();
  const [association, setAssociation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchingAssociation();
    fetchingMessages();
  }, []);

  const fetchingAssociation = async () => {
    const request = await fetch(`http://localhost:8000/associations/${slug}`);
    const response = await request.json();
    setAssociation(response);
  };

  const fetchingMessages = async () => {
    const request = await fetch(
      `http://localhost:8000/associations/messages/all`
    );
    const response = await request.json();
    setMessages(response);
  };

  if (!association) {
    return (
      <div className="container flex justify-center align-center pt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div class="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={association.image}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{association.name}</h1>
            <h2 className="pt-6 font-semibold">{association.description}</h2>
            <h2 className="pt-6 font-semibold">{association.slogan}</h2>
          </div>
        </div>
      </div>
      <div className="container p-5 justify-start align-center pt-10">
        {messages
          .filter((message) => message.slug === association.slug)
          .map((message) => (
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <img
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                ></img>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      {message.name}
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">{message.time}</p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">{message.content}</p>
            </div>
          ))}
      </div>
      <Link to ={`/${association.slug}/message`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5">
          Add a message
        </button>
      </Link>
    </>
  );
}

export default Association;
