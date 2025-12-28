import "./Chat.css";
import Message from "./Message";

const Chat = ({messageList}) => {
    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-header-title">
                    <span className="chat-header-title-span">1:1 채팅 문의</span>
                </div>
            </div>
            <div className="chat-body">
                {messageList.map((data) => 
                    <Message info={data} />
                )}
            </div>
            <div className="chat-footer">
                <div className="chat-footer-input">
                    <textarea placeholder="채팅을 입력해주세요...."></textarea>
                </div>
                <div className="chat-footer-button">
                    <button id="btn-message-send">전송</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;