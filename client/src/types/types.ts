export interface FormTypes {
  handleMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoomChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleJoinRoom: () => void;
  message: string;
  room: string;
}

export interface MessageTypes {
  messages: {
    text: string;
    sender: string;
  }[];
  userId: string | undefined;
}
