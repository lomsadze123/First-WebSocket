import { useState } from "react";
import useChat from "../../hooks/useChat/useChat";
import ChatForm from "../chatForm/ChatForm";
import MessageList from "../messageList/MessageList";

const Main = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  const { messages, sendMessage, joinRoom, joined, userId } = useChat();

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "" && room.trim() !== "") {
      sendMessage(message, room);
      setMessage("");
    }
  };

  const handleJoinRoom = () => {
    joinRoom(room);
  };

  return (
    <main className="container mx-auto p-4">
      {joined ? (
        <h1 className="text-center mb-2 text-xl">You are join '{room}' room</h1>
      ) : (
        <h1 className="text-center mb-2 text-xl">You are not joined yet</h1>
      )}
      <ChatForm
        handleMessageChange={handleMessageChange}
        handleRoomChange={handleRoomChange}
        handleSubmit={handleSubmit}
        handleJoinRoom={handleJoinRoom}
        message={message}
        room={room}
      />
      <MessageList messages={messages} userId={userId} />
    </main>
  );
};

export default Main;
