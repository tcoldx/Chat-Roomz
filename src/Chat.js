import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { BsFillArrowLeftCircleFill, 
  BsFillChatLeftFill } from "react-icons/bs";


const Chat = ({ socket, user, room, handleClick }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendText = async () => {
    if (message !== "") {
      let currDate = new Date();
      const messageData = {
        room: room,
        user: user,
        message: message,
        date: currDate.getHours() + ":" + currDate.getMinutes(),
      };
      await socket.emit("send-message", messageData);
      setChat((list) => [...list, messageData]);
      setMessage("")
    }
  };
  

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setChat((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{room}</h2>
        <BsFillArrowLeftCircleFill onClick={handleClick} color="white" className="arrow-icon"/>
        </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {chat?.map((el) => {
            return (
              <div className="message" id={user === el.user ? "you" : "other"}>
                <div className="message-content">
                  <p>{el.message}</p>
                </div>
                <div className="message-meta">
                  <p id="author">{el.user}</p>
                  <p id="author">{el.date}</p>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          value={message}
          type="text"
          placeholder="Hi..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendText()}
        />

        <button  onClick={sendText}><BsFillChatLeftFill color="white"/> </button>
      </div>
    </div>
  );
};

export default Chat;
