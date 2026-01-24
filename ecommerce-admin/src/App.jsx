import { Route, Routes } from 'react-router-dom'
import './App.css'
import SideNavigation from "./components/SideNavigation";
import MainPage from './pages/MainPage'
import ProductList from './pages/ProductList'
import NoticePage from './pages/NoticePage'
import NoticeWritePage from './pages/NoticeWritePage'
import NoticeDetail from './pages/NoticeDetail'
import MemberList from './pages/MemberList'
import CustomerInquiryListPage from './pages/CustomerInquiryListPage'
import CustomerInquiry from './pages/CustomerInquiry'
import Header from './components/Header';

function App() {
  let userInfo = {
    name: '이베어',
    email: 'ebear@knou.ac.kr'
  }

  let navigation = [
    { subject: 'HOME', url: '/home' },
    { subject: '공지사항', url: '/notice' },
    { subject: '상품관리', url: '/proudct' },
    { subject: '회원목록', url: '/member' },
    { subject: '주문목록', url: '/order' },
    { subject: '문의목록', url: '/inquiry' }
  ];

  let notice = {
    content:'[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
  }

  return (
    <div className='admin-container'>
      <SideNavigation userInfo={userInfo} navigation={navigation} />
      <div className='main-container'>
        <Header notice={notice} />
        <div className='main-section'>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/notice/view/:id" element={<NoticeDetail />} />
            <Route path="/notice/write" element={<NoticeWritePage />} />
            <Route path="/proudct" element={<ProductList />} />
            {/* <Route path="/proudct/write" element={<ProductList />} /> */}
            <Route path="/member" element={<MemberList />} />
            {/* <Route path="/order" element={<MainPage />} /> */}
            <Route path="/inquiry" element={<CustomerInquiryListPage />} />
            <Route path="/inquiry/view/:id" element={<CustomerInquiry />} />
            <Route path="/inquiry/write" element={<CustomerInquiry />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
