import "./Message.css";
import { Avatar, AvatarFallback, UserIcon } from "./CustomTag";

const Message = ({info}) => {
    return (
        <div className={`chat-message-container ${info.isMe ? "is-me-container" : ""}`}>
            {
                !info.isMe &&
                <div className="chat-user-info">
                    <div className="avatar-icon-container">
                        <Avatar className="message-seller-avatar">
                            <AvatarFallback className="message-avatar-fallback">
                                <UserIcon className="message-seller-avatar-icon" />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="chat-user-name">{info.name}</div>
                </div>
            }
            <div className={`message-container ${info.isMe ? "" : "margin-left"}`}>
                {
                    info.isMe && 
                    <div className="chat-message-date-container">
                        <span>{info.date}</span>
                        <span>{info.time}</span>
                    </div>
                }
                <div className={`message-box ${info.isMe ? "is-me" : ""}`}>
                    <span>{info.message}</span>
                </div>
                {
                    !info.isMe && 
                    <div className="chat-message-date-container">
                        <span>{info.date}</span>
                        <span>{info.time}</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default Message;