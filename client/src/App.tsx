import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [userId, setUsedId] = useState<string | undefined>("");

  useEffect(() => {
    const newSocket = io("https://first-websocket.onrender.com");
    newSocket.on("connect", () => {
      console.log(`you connected with id: ${newSocket.id}`);
      setUsedId(newSocket.id);
    });
    setSocket(newSocket);

    newSocket.on("message", (message) => {
      setMessages((prevMessages: { text: string; sender: string }[]) => [
        ...prevMessages,
        { text: message.text, sender: message.sender },
      ]);
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
      setJoined(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {joined ? (
        <h1 className="text-center mb-2 text-xl">You are join '{room}' room</h1>
      ) : (
        <h1 className="text-center mb-2 text-xl">You are not joined yet</h1>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:items-center"
      >
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type a message..."
          className="mb-2 md:mr-2 md:mb-0 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 flex-1"
        />
        <input
          type="text"
          value={room}
          onChange={handleRoomChange}
          placeholder="Enter room name..."
          className="mb-2 md:mr-2 md:mb-0 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="mb-2 md:mb-0 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send
        </button>
        <button
          type="button"
          onClick={handleJoinRoom}
          className="px-4 py-2 bg-green-500 text-white rounded md:ml-2 hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Join Room
        </button>
      </form>
      <ul className="mt-4">
        {messages.map(
          (message: { text: string; sender: string }, index: number) => (
            <li
              key={index}
              className={`p-2 mb-2 rounded w-1/2 ${
                message.sender === userId
                  ? "bg-blue-500 text-white text-right ml-auto"
                  : "bg-gray-200"
              }`}
            >
              {message.text}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default App;
