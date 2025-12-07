import "./ChatRoom.css";
import { Avatar, AvatarFallback, UserIcon } from "./CustomTag";

const ChatRoom = ({roomInfo}) => {
    return (
        <div className="chat-room-container">
            <div>
                <Avatar className="seller-avatar">
                    <AvatarFallback className="avatar-fallback">
                        <UserIcon className="seller-avatar-icon" />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="room-info-title-message">
                <span>{roomInfo.title}</span>
                <span>{roomInfo.message}</span>
            </div>
            <div className="room-info-title-message">
                <span>{roomInfo.messageDate}</span>
                <span>{roomInfo.notReadMessageCnt}</span>
            </div>
        </div>
    );
}

export default ChatRoom;