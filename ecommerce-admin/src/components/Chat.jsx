import "./Chat.css";

const Chat = () => {
    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-header-title">
                    <span>1:1 채팅 문의</span>
                </div>
            </div>
            <div className="chat-body">
                
            </div>
            <div className="chat-footer">
                <div className="chat-footer-input">
                    <input type="text" placeholder="메세지를 입력하세요." />
                </div>
                <div className="chat-footer-button">
                    <button>전송</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;