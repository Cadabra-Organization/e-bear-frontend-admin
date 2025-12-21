import ChatRoom from "./ChatRoom";
import "./ChatRoomList.css";

const ChatRoomList = () => {
    const roomInfoList = [
        {id: 1, title: "XXX님의 1:1 문의 채팅방", message: "최근메세지 입니다.", notReadMessageCnt: 300, messageDate: '2025-11-30 11:30:54'},
        {id: 2, title: "XXX님의 1:1 문의 채팅방", message: "최근메세지 입니다.", notReadMessageCnt: 5, messageDate: '2025-11-30 11:30:55'},
        {id: 3, title: "XXX님의 1:1 문의 채팅방", message: "최근메세지 입니다.", notReadMessageCnt: 200, messageDate: '2025-11-30 11:30:56'},
        {id: 4, title: "XXX님의 1:1 문의 채팅방", message: "최근메세지 입니다.", notReadMessageCnt: 500, messageDate: '2025-11-30 11:30:57'},
        {id: 5, title: "XXX님의 1:1 문의 채팅방", message: "최근메세지 입니다.", notReadMessageCnt: 213, messageDate: '2025-11-30 11:30:58'},
        {id: 6, title: "XXX님의 1:1 문의 채팅방", message: "최근메세지 입니다.", notReadMessageCnt: 213, messageDate: '2025-11-30 11:30:58'},
        {id: 7, title: "XXX님의 1:1 문의 채팅방", message: "최근메세지 입니다.", notReadMessageCnt: 213, messageDate: '2025-11-30 11:30:58'},
        {id: 8, title: "XXX님의 1:1 문의 채팅방", message: "최근메세지 입니다.", notReadMessageCnt: 213, messageDate: '2025-11-30 11:30:58'},
        {id: 9, title: "XXX님의 1:1 문의 채팅방", message: "최근메세지 입니다.", notReadMessageCnt: 213, messageDate: '2025-11-30 11:30:58'},
    ];

    return (
        <div className="chat-room-list-container">
            {roomInfoList.map((data) => <ChatRoom roomInfo={data} />)}
        </div>
    );
}

export default ChatRoomList;