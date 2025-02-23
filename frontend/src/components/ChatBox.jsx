import ScrollToBottom from "react-scroll-to-bottom"

const ChatBox = ({ messageList }) => {
    return (
        <ScrollToBottom className="shadow shadow-white h-[455px] rounded-xl pt-3">
            {
                messageList.map((messageContent, index) => (
                    <div key={index} className={`flex ${messageContent.role === 'user' ? 'justify-end' : 'justify-start'} 2xl:text-base my-2 px-2`}>
                        <div className={`flex flex-col max-w-[90%] md:max-w-[50%]`}>
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
                ))
            }
        </ScrollToBottom>
    )
}

export default ChatBox