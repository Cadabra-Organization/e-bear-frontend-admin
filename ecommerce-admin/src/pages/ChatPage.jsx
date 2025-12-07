import "./ChatPage.css";
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";
import ChatRoomList from "../components/ChatRoomList";
import Chat from "../components/Chat";

const ChatPage = () => {
    let navigation = [
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'},
        {subject:'HOME', url:'/admin/home'}
    ];

    let userInfo = {
        name:'이베어',
        email:'ebear@knou.ac.kr'
    }

    let notice = {
        content:'공지'
    }

    return (
        <div className='admin-container'>
            <SideNavigation userInfo={userInfo} navigation={navigation}/>
            <div className='main-container'>
                <Header notice={notice}/>
                <div className='main-section'>
                    <div className="chat-main-section">
                        <span>1:1 채팅 문의</span>
                        <hr />
                        <ChatRoomList />
                        <Chat />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;