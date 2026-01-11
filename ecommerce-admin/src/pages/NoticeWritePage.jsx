import "./NoticeWritePage.css";
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";
import NoticeWrite from "../components/NoticeWrite";

const NoticeWritePage = () => {
    let navigation = [
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' }
    ];

    let userInfo = {
        name: '이베어',
        email: 'ebear@knou.ac.kr'
    }

    let notice = {
        content: '공지'
    }

    return (
        <div className='admin-container'>
            <SideNavigation userInfo={userInfo} navigation={navigation} />
            <div className='notice-write-main-container'>
                <Header notice={notice} />
                <div className='notice-write-main-section'>
                    <span className="notice-section-title">공지사항</span>
                    <hr />
                    <NoticeWrite />
                </div>
            </div>
        </div>
    );
}

export default NoticeWritePage;