import { MessageTypes } from "../../types/types";

const MessageList = ({ messages, userId }: MessageTypes) => {
  return (
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
  );
};

export default MessageList;
