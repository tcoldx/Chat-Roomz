import "./App.css";
import React, { useState } from "react";
import Chat from "./Chat";
import io from "socket.io-client";

const socket = io.connect("https://cryptoz-chat.herokuapp.com/");

function App() {
  const [username, setUsersame] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const roomEnter = () => {
    if (username && room) {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const handleClick = () => {
    setShowChat(false)
    setRoom("")
    setUsersame("")
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Welcome to Chat Roomz!</h3>
          <input
            type="text"
            placeholder="Goku"
            onChange={(e) => setUsersame(e.target.value)}
          />
          <input
            type="text"
            placeholder="room name.."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={roomEnter}>Join room!</button>
        </div>
      ) : (
        <Chat socket={socket} user={username} room={room} handleClick={handleClick}/>
      )}
    </div>
  );
}

export default App;
