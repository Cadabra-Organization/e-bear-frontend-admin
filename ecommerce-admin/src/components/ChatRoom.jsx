import "./ChatRoom.css";
import { Avatar, AvatarFallback, UserIcon } from "./CustomTag";

const ChatRoom = ({roomInfo}) => {
    return (
        <div className="chat-room-container">
            <div className="chat-room-info-container">
                <div>
                    <Avatar className="seller-avatar">
                        <AvatarFallback className="avatar-fallback">
                            <UserIcon className="seller-avatar-icon" />
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="room-info-title-message">
                    <span className="room-info-title">{roomInfo.title}</span>
                    <span className="room-info-message">{roomInfo.message}</span>
                </div>
            </div>
            <div className="room-info-title-message">
                <span>{roomInfo.messageDate}</span>
                <div className="not-read-message-cnt-container">
                    <span className="not-read-message-cnt">{roomInfo.notReadMessageCnt}</span>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;