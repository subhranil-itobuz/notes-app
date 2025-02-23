import { useContext, useEffect, useState } from "react"
import ChatBox from "../components/ChatBox"
import Navbar from "../components/Navbar"
import { ChatContext } from "../contexts/ChatContext"

const UserChatsPage = () => {
    const { getChat } = useContext(ChatContext)
    const [userName, setUserName] = useState('Username')
    const [messageList, setMessageList] = useState([])
    const [totalMessages, setTotalMessages] = useState(0)

    useEffect(() => {
        const getMessage = async () => {
            const res = await getChat()
            if (res?.data.success) {
                setUserName(res.data.userName)
                setMessageList(res?.data.data)
                setTotalMessages(res.data.totalMessages)
            }
        }

        getMessage()

        //eslint-disable-next-line
    }, [])

    return (
        <div>
            <Navbar />
            <section className="max-w-[768px] mx-auto my-10 px-2">
                <h1 className="mb-5 text-2xl font-mono font-bold text-orange-500 text-center">
                    All Chats&nbsp;
                    <span className={`${userName === 'Username' ? 'hidden' : 'inline-block'}`}>
                        of {userName}
                    </span>
                </h1>
                {
                    messageList.length
                        ?
                        <div >
                            <h3 className="text-sm text-gray-400 text-center pb-2">Total Messages: {totalMessages}</h3>
                            <ChatBox messageList={messageList} />
                        </div>
                        :
                        <div className="text-red-500 text-xl font-medium text-center mt-28 px-4">*No Chats with this user</div>
                }
            </section>
        </div >
    )
}

export default UserChatsPage