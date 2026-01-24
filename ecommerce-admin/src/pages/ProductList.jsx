import "./ProductList.css";
import Button from '@mui/material/Button';
import SideNavigation from "../components/SideNavigation";
import Header from "../components/Header";
import DataTable from "../components/DataTable";

const generateDummyRows = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        const day = i < 10 ? `0${i}` : `${i}`;
        const year = 2024;
        const month = (i % 12) + 1;
        const monthStr = month < 10 ? `0${month}` : `${month}`;

        const saleStatus = ['판매중', '판매완료'];
        const randomIndex = Math.floor(Math.random() * saleStatus.length);
        const saleStatusValue = saleStatus[randomIndex];
        const price = 100000;

        data.push({
            num: i,
            subject: `상품관리 제목 ${i}입니다.`,
            writer: `관리자${i % 5 + 1}`,
            price: price.toLocaleString(),
            regDt: `${year}-${monthStr}-${day}`,
            viewCnt: Math.floor(Math.random() * 500) + 50,
            testNum: Math.floor(Math.random() * 100) + 1,
            saleStatusValue: saleStatusValue,
            modifyBtn: (
                <Button variant="outlined" sx={{ backgroundColor: '#000', color: 'white' }}>수정하기</Button>
            ),
        });
    }
    return data.reverse(); // 역순으로 정렬
};

// 더미 데이터 갯수 할당 및 생성 
const rows = generateDummyRows(50);

const NoticePage = () => {
    let navigation = [
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' }
    ];

    // 보여주고 싶은 검색 조건 설정 (SearchHeader를 제어)
    const searchConfig = {
        showCondition: true,  // 검색조건 선택 
        showText: true,       // 검색어 입력 
        showDelete: true,     // 삭제 버튼 
        showWrite: true,      // 글쓰기 버튼 
        showDownload: true,   // 다운로드 버튼 
    };

    let userInfo = {
        name: '이베어',
        email: 'ebear@knou.ac.kr'
    }

    let notice = {
        content: '[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
    }

    let titleInfo = {
        title: '상품관리',
    }

    const labelConfig = {
        searchLabel: "검색조건"
    };

    let pageInfo = {
        searchList: {
            'all': '전체',
            'title': '제품명',
            'seq': '번호',
            'seller': '판매자',
        }
    }

    // 테이블 헤더 정의
    let headCells = [
        {
            id: 'num',
            numeric: false,
            disablePadding: true,
            label: '번호',
            width: 50,
            align: 'center',
        }, {
            id: 'subject',
            numeric: false,
            disablePadding: false,
            label: '제품명',
            width: 200,
            align: 'center',
        }, {
            id: 'testNum',
            numeric: false,
            disablePadding: false,
            label: '남은수량',
            width: 50,
            align: 'center',
        }, {
            id: 'price',
            numeric: false,
            disablePadding: false,
            label: '금액',
            width: 90,
            align: 'center',
        }, {
            id: 'writer',
            numeric: false,
            disablePadding: false,
            label: '판매자명',
            width: 50,
            align: 'center',
        }, {
            id: 'regDt',
            numeric: false,
            disablePadding: false,
            label: '게시일',
            width: 70,
            align: 'center',
        }, {
            id: 'saleStatusValue',
            numeric: false,
            disablePadding: false,
            label: '판매상태',
            width: 50,
            align: 'center',
        }, {
            id: 'modifyBtn',
            numeric: false,
            disablePadding: false,
            label: '수정유무',
            width: 50,
            align: 'center',
        }
    ];

    return (
        // <span className="notice-main-section-title">{titleInfo.title}</span>
        //             <hr />
        <div className = "notice-main-section-table" >
            <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} />
        </div >
    );
};

export default NoticePage;