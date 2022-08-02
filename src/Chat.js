import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, user, room }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendText = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        user: user,
        message: message,
      };
      await socket.emit("send-message", messageData);
      setChat((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setChat((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">{room}</div>
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
        <button onClick={sendText}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
