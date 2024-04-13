import { FormTypes } from "../../types/types";

const ChatForm = ({
  handleSubmit,
  handleMessageChange,
  handleRoomChange,
  handleJoinRoom,
  message,
  room,
}: FormTypes) => {
  return (
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
  );
};

export default ChatForm;
