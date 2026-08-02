import { useState, useRef, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";
import api from "../api/axios";

const Chat = ({ room, messageList, sendMessage, stompClient, myUserId }) => {
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null); 

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    const markAsRead = async () => {
        if (!room?.id) return;

        try {
            await api.post(`/chat/rooms/${room.id}/read`, { userId: myUserId });

            if (stompClient?.current?.connected) {
                stompClient.current.publish({
                    destination: "/app/chat/read",
                    body: JSON.stringify({
                        roomId: room.id,
                        readerId: myUserId
                    })
                });
            }
        } catch (err) {
            console.error("읽음 처리 실패:", err);
        }
    };

    useEffect(() => {
        if (room && messageList.length > 0) {
            markAsRead();
        }
    }, [room?.id, messageList.length]);

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