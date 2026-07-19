import { useState, useEffect } from "react";
import ChatRoom from "./ChatRoom";
import "./ChatRoomList.css";
import api from "../api/axios";

const ChatRoomList = ({onSelectRoom}) => {
    const [roomInfoList, setRoomInfoList] = useState([]);

    const fetchProductList = async () => {
      try {
          const response = await api.get("/chat/rooms/admin");
          setRoomInfoList(response.data);
      } catch (err) {
          console.error("상품 목록 조회 실패:", err);
      }
    };
  
    useEffect(() => {
      fetchProductList();
    }, []);

    return (
        <div className="chat-room-list-container">
            {roomInfoList.map((data) => <ChatRoom roomInfo={data} onClick={() => onSelectRoom(data)} />)}
        </div>
    );
}

export default ChatRoomList;