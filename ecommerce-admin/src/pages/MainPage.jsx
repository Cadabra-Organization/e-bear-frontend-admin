
import "./MainPage.css";
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";

const MainPage = () => {
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
        <div className='main-section'>
            메인 영역
        </div>
    );
}

export default MainPage;