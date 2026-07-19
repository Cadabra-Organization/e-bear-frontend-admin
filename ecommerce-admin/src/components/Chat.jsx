import { useState, useRef, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";

const Chat = ({ room, messageList, sendMessage }) => {
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null); 

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    if (!room) {
        return (
            <div className="chat-container">
                <div className="chat-body">
                    채팅방을 선택해주세요.
                </div>
            </div>
        );
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-header-title">
                    <span className="chat-header-title-span">1:1 채팅 문의 {room.title}</span>
                </div>
            </div>
            <div className="chat-body">
                {messageList.map((data) => 
                    <Message info={data} />
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-footer">
                <div className="chat-footer-input">
                    <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="채팅을 입력해주세요...."></textarea>
                </div>
                <div className="chat-footer-button">
                    <button onClick={() => {sendMessage(inputValue); setInputValue("");}} id="btn-message-send">전송</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;