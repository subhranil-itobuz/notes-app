import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { IoSend } from "react-icons/io5";
import io from 'socket.io-client'
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";


const socket = io.connect("http://localhost:3000");

const Chat = () => {
  const { user } = useContext(UserContext)
  const { room } = useContext(ChatContext)
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const joinRoom = () => {
    console.log('the room id is:', room)
    socket.emit("join_room", room);
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: user.userName,
        role: user.role,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      console.log('this is message data:', messageData)
      io.connect("http://localhost:3000").emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  }

  useEffect(() => {
    joinRoom()

    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [messageList]);

  return (
    <>
      <Navbar />
      <div className="px-3 max-w-[750px] mx-auto">
        <h1 className="text-3xl text-white text-center font-semibold font-mono py-5">Live Chat</h1>
        <section className="  shadow shadow-white h-[480px] rounded-xl overflow-auto py-5 px-2">
          {messageList.map((messageContent, index) => {
            return (
              <div key={index} className={`flex justify-${messageContent.role === 'admin' ? 'end text-yellow-400' : 'start text-white'} 2xl:text-base my-2`}
              >
                <div className="flex flex-col max-w-[90%] md:max-w-[50%]">
                  <div className="">
                    <p className={`bg-slate-500 ${messageContent.role === 'admin' ? 'rounded-tl-md rounded-bl-md' : 'rounded-tr-md rounded-br-md'}   px-2 py-1`}>{messageContent.message}</p>
                  </div>
                  <div className={`flex justify-${messageContent.role === 'admin' ? 'end' : 'start'} gap-2 text-xs text-gray-400`}>
                    <p>{messageContent.author}</p>
                    <p>{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })
          }
        </section>
        <section className="w-full flex gap-2 my-5">
          <input type="text" value={currentMessage} placeholder="Enter message" className="mx-auto py-2 px-3 w-[90%] rounded-xl focus:outline-none" onChange={(e) => {
            setCurrentMessage(e.target.value);
          }} onKeyUp={(e) => {
            e.key === "Enter" && sendMessage();
          }} />
          <button className="bg-green-600 hover:bg-green-500 w-fit px-3 py-2 rounded-xl text-center mx-auto" onClick={sendMessage}>
            <IoSend size={30} />
          </button>
        </section>
      </div>
    </>
  );
};

export default Chat;