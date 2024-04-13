import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    newSocket.on("connect", () => {
      console.log(`you connected with id: ${newSocket.id}`);
    });
    setSocket(newSocket);

    newSocket.on("message", (message) => {
      setMessages((prevMessages: string[]) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (message: string) => {
    socket?.emit("chat message", message, room);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "" && room.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleJoinRoom = () => {
    if (room.trim() !== "") {
      socket?.emit("join", room);
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message: string, index: number) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type a message..."
        />
        <input
          type="text"
          value={room}
          onChange={handleRoomChange}
          placeholder="Enter room name..."
        />
        <button type="submit">Send</button>
        <button type="button" onClick={handleJoinRoom}>
          Join Room
        </button>
      </form>
    </div>
  );
};

export default App;
