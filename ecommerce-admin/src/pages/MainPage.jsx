import { useState, useMemo } from "react";
import "./MainPage.css";
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";
import NoticePage from "./NoticePage"; 

const DEFAULT_PAGE = 'HOME';

const MainPage = () => {
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    
    // 로그인한 사용자 정보 (실제로는 API나 Context에서 가져와야 함)
    const [userInfo] = useState({
        name: '이베어',
        email: 'ebear@knou.ac.kr'
    });
    
    // 페이지별 공지사항 (navigation에 따라 가변적)
    const [notice] = useState({
        content: '[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
    });

    // 페이지 컴포넌트 매핑
    const pageComponents = useMemo(() => ({
        '공지사항': NoticePage,
    }), []);

    const navigation = useMemo(() => [
        { subject: 'HOME', url: '/admin/home' },
        { subject: '상품관리', url: '/admin/home' },
        { subject: '회원관리', url: '/admin/home' },
        { subject: '주문관리', url: '/admin/home' },
        { subject: '문의', url: '/admin/home' },
        { subject: '공지사항', url: '/admin/home' }
    ], []);

    const handleNavigationClick = (subject) => {
        setCurrentPage(subject);
    };

    const renderCurrentPage = () => {
        const PageComponent = pageComponents[currentPage];

        if (PageComponent) {
            return <PageComponent notice={notice} />;
        }

        // 기본 페이지 (구현되지 않은 페이지)
        return (
            <>
                <Header notice={notice} />
                <div className='main-section'>
                    <div style={{ padding: '20px' }}>
                        <h2>{currentPage}</h2>
                        <p>이 페이지는 아직 구현되지 않았습니다.</p>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className='admin-container'>
            <SideNavigation 
                userInfo={userInfo} 
                navigation={navigation}
                onNavigationClick={handleNavigationClick}
                currentPage={currentPage}
            />
            <div className='main-container'>
                {renderCurrentPage()}
            </div>
        </div>
    );
};

export default MainPage;