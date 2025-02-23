import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const { user } = useContext(UserContext)
  const { room, sendChat } = useContext(ChatContext);

  const [socket, setSocket] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");


  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };

  }, []);

  useEffect(() => {
    if (socket && room) {
      socket.emit("joinRoom", room);
    }
  }, [socket, room]);

  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (newMessage) => {
        setMessageList((prevMessages) => [...prevMessages, newMessage]);
      };

      socket.on("receive_message", handleReceiveMessage);

      return () => {
        socket.off("receive_message", handleReceiveMessage);
      };
    }
  }, [socket, setMessageList]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "" && socket) {
      const messageData = {
        room: room,
        author: user.userName,
        role: user.role,
        message: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      await socket.emit("sendMessage", messageData);

      const res = await sendChat(room, messageData.message)
      setMessageList((prevMessage) => [...prevMessage, res?.data.data]);
      setCurrentMessage("");
    }
  };


  return (
    <>
      <Navbar />
      <div className="px-3 max-w-[750px] mx-auto bg-[#16425b] pb-2">
        <h1 className="text-3xl text-white text-center font-semibold font-mono py-5">Live Chat</h1>
        {
          messageList?.length === 0
            ?
            <div className="shadow shadow-white h-[455px] rounded-xl flex items-center justify-center">
              <h2 className="font-semibold text-red-500 text-2xl">*Start Chat here</h2>
            </div>
            :
            <ChatBox messageList={messageList} />
        }
        <section className="w-full flex gap-2 my-5">
          <input
            type="text"
            value={currentMessage}
            placeholder="Enter message"
            className="mx-auto py-2 px-3 w-[90%] rounded-xl focus:outline-none"
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="bg-green-600 hover:bg-green-500 w-fit px-3 py-2 rounded-xl text-center mx-auto" onClick={sendMessage}>
            <IoSend size={30} />
          </button>
        </section>
      </div>
    </>
  );
};

export default Chat;
