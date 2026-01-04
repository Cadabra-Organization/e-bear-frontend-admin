import "./notice_detail.css";
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";

const NoticeDetail = () => {
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
        content:'[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
    }

    return (
        <div className='admin-container'>
            <SideNavigation userInfo={userInfo} navigation={navigation}/>
            <div className='main-container'>
                <Header notice={notice}/>
                <div className='body-container'>
                    <div className='main-section'>
                        공지사항
                    </div>
                    <div className='notice-name'>
                        제목입니다.
                    </div>
                    <div className="notice_content">
                        <textarea className="notice-textarea" placeholder="여기서부터는 내용입니다."/>
                    </div>
                    <div className="notice-buttons">
                        <button className="notice-btn notice-btn-modify">수정</button>
                        <button className="notice-btn notice-btn-delete">삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeDetail;