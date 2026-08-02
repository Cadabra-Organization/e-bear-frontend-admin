import { useState, useEffect } from "react";
import ChatRoom from "./ChatRoom";
import "./ChatRoomList.css";
import api from "../api/axios";

const ChatRoomList = ({onSelectRoom, updatedRoom}) => {
    const [roomInfoList, setRoomInfoList] = useState([]);

    const fetchRoomList = async () => {
      try {
          const response = await api.get("/chat/rooms/admin");
          setRoomInfoList(response.data);
      } catch (err) {
          console.error("상품 목록 조회 실패:", err);
      }
    };

    useEffect(() => {
        fetchRoomList();
    }, []);
  
    useEffect(() => {
        if (!updatedRoom) return;

        setRoomInfoList((prevList) => {
            const exists = prevList.some(
                (room) => String(room.id) === String(updatedRoom.id)
            );

            if (exists) {
                const updatedList = prevList.map((room) => {
                    if (String(room.id) === String(updatedRoom.id)) {
                        const newCount = updatedRoom.messageCount ?? updatedRoom.notReadMessageCnt ?? 0;

                        return {
                            ...room,
                            lastMessage: updatedRoom.lastMessage ?? room.lastMessage,
                            message: updatedRoom.lastMessage ?? room.message,
                            lastMessageTime: updatedRoom.lastMessageTime ?? room.lastMessageTime,
                            messageCount: newCount,
                            notReadMessageCnt: newCount,
                        };
                    }
                    return room;
                });

                const targetRoom = updatedList.find(
                    (room) => String(room.id) === String(updatedRoom.id)
                );
                const otherRooms = updatedList.filter(
                    (room) => String(room.id) !== String(updatedRoom.id)
                );

                return [targetRoom, ...otherRooms];
            } else {
                fetchRoomList();
                return prevList;
            }
        });
    }, [updatedRoom]);

    return (
        <div className="chat-room-list-container">
            {roomInfoList.map((data) => <ChatRoom roomInfo={data} onClick={() => onSelectRoom(data)} />)}
        </div>
    );
}

export default ChatRoomList;