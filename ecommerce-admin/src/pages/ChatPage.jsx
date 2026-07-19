import "./ChatPage.css";
import ChatRoomList from "../components/ChatRoomList";
import Chat from "../components/Chat";
import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatPage = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [myUserId, setMyUserId] = useState(null);
    const stompClient = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await api.get("/chat/user/me");
            setMyUserId(response.data.userId);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (!selectedRoom || !myUserId) return;

        const fetchMessages = async () => {
            try {
                const response = await api.get(`/chat/rooms/${selectedRoom.id}/messages`);
                const formattedMessages = response.data.map(item => ({
                    ...item,
                    isMe: item.senderId === myUserId,
                    message: item.content,
                    date: new Date(item.regDate).toLocaleDateString(),
                    time: new Date(item.regDate).toLocaleTimeString([], {hour: '2-digit',minute: '2-digit'}),
                }));
    
                setMessageList(formattedMessages);
            } catch (err) {
                console.error("메시지 조회 실패:", err);
            }
        };

        fetchMessages();
    }, [selectedRoom, myUserId]);

    useEffect(() => {
        if (!selectedRoom || !myUserId) return;
        const token = localStorage.getItem("token");

        const client = new Client({
            webSocketFactory: () =>new SockJS("/ws"),
            connectHeaders:{Authorization: token},

            onConnect:()=>{
                console.log("관리자 websocket 연결");

                client.subscribe(
                    `/topic/chat/${selectedRoom.id}`,
                    message=>{
                        const data =JSON.parse(message.body);
                        const formatted = {
                            ...data,
                            isMe:data.senderId === myUserId,
                            message:data.content,
                            date:new Date().toLocaleDateString(),
                            time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})
                        };

                        setMessageList(prev=>[
                            ...prev,
                            formatted
                        ]);

                    }
                );
            }
        });

        client.activate();
        stompClient.current = client;

        return ()=>{
            client.deactivate();
        };
    },[selectedRoom,myUserId]);

    const sendMessage = (content)=>{
        if(!content.trim()) return;

        const message={
            roomId:selectedRoom.id,
            content:content,
            senderId:myUserId
        };

        stompClient.current.publish({
            destination:"/app/chat/send",
            body:JSON.stringify(message)
        });
    };

    return (
        <div className='main-section'>
            <div>
                <span className="chat-main-section-title">1:1 채팅 문의</span>
                <hr />
                <div className="chat-main-section">
                    <ChatRoomList onSelectRoom={setSelectedRoom}/>
                    <Chat room={selectedRoom} messageList={messageList} sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;