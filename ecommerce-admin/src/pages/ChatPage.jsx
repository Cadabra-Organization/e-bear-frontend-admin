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
    const [roomListUpdate, setRoomListUpdate] = useState(null);

    const stompClient = useRef(null);
    const chatSubscription = useRef(null); // 방 별 메시지 구독 정보 저장용

    // 1. 내 사용자 정보 조회
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/chat/user/me");
                setMyUserId(response.data.userId);
            } catch (err) {
                console.error("사용자 정보 조회 실패:", err);
            }
        };

        fetchUser();
    }, []);

    // 2. [선택된 방] 이전 메시지 목록 조회
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
                    time: new Date(item.regDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }));

                setMessageList(formattedMessages);
            } catch (err) {
                console.error("메시지 조회 실패:", err);
            }
        };

        fetchMessages();
    }, [selectedRoom, myUserId]);

    // 3. [핵심 수정] WebSocket 최초 연결 & 목록(/topic/list) 상시 구독 (방 안 열어도 항상 동작)
    useEffect(() => {
        if (!myUserId) return; // selectedRoom 조건을 없앴습니다!
        const token = localStorage.getItem("token");

        const client = new Client({
            webSocketFactory: () => new SockJS("/ws"),
            connectHeaders: { Authorization: token ? token : "" },

            onConnect: () => {
                console.log("WebSocket 상시 연결 성공");

                // 방을 선택하지 않아도 실시간 목록 updates를 계속 수신함
                client.subscribe("/topic/list", message => {
                    const updatedRoomData = JSON.parse(message.body);
                    console.log("실시간 목록 업데이트 수신:", updatedRoomData);
                    setRoomListUpdate(updatedRoomData);
                });
            }
        });

        client.activate();
        stompClient.current = client;

        return () => {
            client.deactivate();
        };
    }, [myUserId]); // myUserId 확보되면 바로 연결

    // 4. [선택된 방] 메시지 실시간 구독 (방을 클릭해서 열었을 때만 해당 방 채널 추가 구독)
    useEffect(() => {
        if (!selectedRoom || !stompClient.current) return;

        // 이전 구독 해제
        if (chatSubscription.current) {
            chatSubscription.current.unsubscribe();
        }

        // 현재 웹소켓 연결 상태일 때 해당 방 메시지 구독
        if (stompClient.current.connected) {
            chatSubscription.current = stompClient.current.subscribe(
                `/topic/chat/${selectedRoom.id}`,
                message => {
                    const data = JSON.parse(message.body);
                    const formatted = {
                        ...data,
                        isMe: data.senderId === myUserId,
                        message: data.content,
                        date: new Date().toLocaleDateString(),
                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    };

                    setMessageList(prev => [...prev, formatted]);
                }
            );
        }

        return () => {
            if (chatSubscription.current) {
                chatSubscription.current.unsubscribe();
            }
        };
    }, [selectedRoom, myUserId]);

    // 5. 메시지 전송
    const sendMessage = (content) => {
        if (!content.trim() || !selectedRoom || !stompClient.current) return;

        const message = {
            roomId: selectedRoom.id,
            content: content,
            senderId: myUserId
        };

        stompClient.current.publish({
            destination: "/app/chat/send",
            body: JSON.stringify(message)
        });
    };

    return (
        <div className='main-section'>
            <div>
                <span className="chat-main-section-title">1:1 채팅 문의</span>
                <hr />
                <div className="chat-main-section">
                    <ChatRoomList onSelectRoom={setSelectedRoom} updatedRoom={roomListUpdate} />
                    <Chat 
                        room={selectedRoom} 
                        messageList={messageList} 
                        sendMessage={sendMessage} 
                        stompClient={stompClient} 
                        myUserId={myUserId}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;