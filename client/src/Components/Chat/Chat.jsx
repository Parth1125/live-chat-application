/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import './Chat.css'
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://live-chat-app-n0r1.onrender.com";

  // console.log(name);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, (error) => {
      if(error){
        alert(error);
      }
    });

    
  }, [ENDPOINT, location.search]);

  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessages([...messages,message])
    });
  },[messages])

  // function for sending messages

  const sendMessage = (event)=>{
    event.preventDefault()

    if(message){
      socket.emit('sendMessage', message,()=>setMessage(''))
    }
  }

  // console.log(message,messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>

      </div>
    </div>
  )
};

export default Chat;
