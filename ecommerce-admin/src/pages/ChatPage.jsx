import "./ChatPage.css";
import ChatRoomList from "../components/ChatRoomList";
import Chat from "../components/Chat";

const ChatPage = () => {
    let MessageList = [
        {isMe:true, name:"나", message: "안녕하세요1", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요1", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요2", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요3", date: "2025-12-28", time: "09:00"},
        {isMe:true, name:"나", message: "안녕하세요2", date: "2025-12-28", time: "09:00"},
        {isMe:true, name:"나", message: "안녕하세요3", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요4", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요5", date: "2025-12-28", time: "09:00"},
        {isMe:false, name:"상대방", message: "안녕하세요6", date: "2025-12-28", time: "09:00"}
    ];

    return (
        <div className='main-section'>
            <div>
                <span className="chat-main-section-title">1:1 채팅 문의</span>
                <hr />
                <div className="chat-main-section">
                    <ChatRoomList />
                    <Chat messageList={MessageList}/>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;