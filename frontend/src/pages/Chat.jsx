import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = () => {
  const { user } = useContext(UserContext);
  const { room } = useContext(ChatContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && room) {
      console.log("Joining room:", room);
      socket.emit("joinRoom", room);
    }
  }, [socket, room]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "" && socket) {
      const messageData = {
        room,
        author: user.userName,
        role: user.role,
        message: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      console.log("Sending message:", messageData);
      await socket.emit("sendMessage", messageData);
      setMessageList((prevMessages) => [...prevMessages, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (newMessage) => {
        console.log("Received message:", newMessage);
        setMessageList((prevMessages) => [...prevMessages, newMessage]);
      };

      socket.on("receive_message", handleReceiveMessage);

      return () => {
        socket.off("receive_message", handleReceiveMessage);
      };
    }
  }, [socket]);

  return (
    <>
      <Navbar />
      <div className="px-3 max-w-[750px] mx-auto bg-[#16425b] pb-2">
        <h1 className="text-3xl text-white text-center font-semibold font-mono py-5">Live Chat</h1>
        {
          messageList.length === 0
            ?
            <div className="shadow shadow-white h-[455px] rounded-xl flex items-center justify-center">
              <h2 className="font-semibold text-red-500 text-2xl">*Start Chat here</h2>
            </div>
            :
            <ScrollToBottom className="shadow shadow-white h-[455px] rounded-xl pt-3">
              {messageList.map((messageContent, index) => (
                <div key={index} className={`flex justify-${messageContent.role === "admin" ? "start" : "end"} 2xl:text-base my-2 px-2`}>
                  <div className={`flex flex-col items-${messageContent.role === "admin" ? "start" : "end"} max-w-[90%] md:max-w-[50%]`}>
                    <p className="px-1 text-xs text-orange-500">{messageContent.author}</p>
                    <div>
                      <p className={`bg-gray-300 rounded-xl px-2 py-1 shadow shadow-slate-400`}>
                        {messageContent.message}
                      </p>
                    </div>
                    <div className={`px-1 text-xs font-light text-gray-400`} >
                      <p>{messageContent.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollToBottom>}
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
