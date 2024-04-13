import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const useChat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [userId, setUserId] = useState<string | undefined>("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const newSocket = io("https://first-websocket.onrender.com");
    newSocket.on("connect", () => {
      console.log(`you connected with id: ${newSocket.id}`);
      setUserId(newSocket.id);
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

  const sendMessage = (message: string, room: string) => {
    socket?.emit("chat message", message, room);
  };

  const joinRoom = (room: string) => {
    if (room.trim() !== "") {
      socket?.emit("join", room);
      setJoined(true);
    }
  };

  return { messages, sendMessage, joinRoom, joined, userId };
};

export default useChat;
