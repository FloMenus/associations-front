import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

function Message() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [newMessage, setNewMessage] = useState({});
  
  const body = {
    name,
    content,
    slug
  };



  const addMessage = async (e) => {
    e.preventDefault();
    
    const request = await fetch(`http://localhost:8000/associations/messages/all/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();
    navigate(`/${slug}`);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  }

  

  return (
    <div>
      <Navbar />
      <form onSubmit={addMessage} className="flex flex-col gap-5 form-control">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChangeName}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="content"
          placeholder="Write your message..."
          onChange={handleChangeContent}
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Message;
