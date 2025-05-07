import React from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { message, getMessages, isMessagesLoading, selectUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectUser?._id);
  }, [selectUser?._id, getMessages]);

  if (isMessagesLoading) return <div>Loading...</div>;
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <p>messages...</p>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
