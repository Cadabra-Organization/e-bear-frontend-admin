import "./CustomerInquiryListPage.css";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerInquiryListPage = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // 보여주고 싶은 검색 조건 설정 (SearchHeader를 제어)
    const searchConfig = {
        showDate: false,      // 날짜 검색 
        showCondition: true, // 검색조건 선택 
        showText: true,      // 검색어 입력 
        showDelete: false,    // 삭제 버튼 
        showWrite: false,      // 글쓰기 버튼
    };

    const labelConfig = {
        statusLabel: "답변유무",
        searchLabel: "검색조건"
    };

    let pageInfo = {
        searchList: {
            all: "전체",
            productName: "제품명",
            title: "제목",
        },
        statusList: {
            all: "전체",
            Y: "답변완료",
            N: "미답변",
        },
    };

    // 테이블 헤더 정의
    let headCells = [
        {
            id: 'num',
            numeric: false,
            disablePadding: true,
            label: '번호',
            width: 60,
            align: 'center',
        },
        {
            id: 'productName',
            numeric: false,
            disablePadding: false,
            label: '제품명',
            width: 200,
            align: 'center',
        },
        {
            id: 'subject',
            numeric: false,
            disablePadding: false,
            label: '제목',
            width: 320,
            align: 'left',
        },
        {
            id: 'customer',
            numeric: true,
            disablePadding: false,
            label: '고객명',
            width: 70,
            align: 'center',
        },
        {
            id: 'regDt',
            numeric: true,
            disablePadding: false,
            label: '등록일자',
            width: 90,
            align: 'center',
        },
        {
            id: 'respondDt',
            numeric: true,
            disablePadding: false,
            label: '답변일자',
            width: 90,
            align: 'center',
        },
        {
            id: 'responder',
            numeric: false,
            disablePadding: false,
            label: '답변자',
            width: 70,
            align: 'center',
        },
    ];

    const mapInquiryRows = (inquiries) => {
        return inquiries.map((item) => ({
            num: item.inquiryNo,
            inquiryNo: item.inquiryNo,
            productName: item.productName,
            subject: item.title,
            customer: item.customer,
            regDt: item.regDt ? item.regDt.substring(0, 10) : "",
            respondDt: item.respondDt ? item.respondDt.substring(0, 10) : "-",
            responder: item.responder ?? "-",
        }));
    };

    const fetchInquiryList = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/inquiry/admin/list");
            console.log(response);

            setRows(mapInquiryRows(response.data));
        } catch (err) {
            console.error("고객문의 목록 조회 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);
            setError("고객문의 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectInquiry = (inquiryNo) => {
        navigate(`/inquiry/detail/${inquiryNo}`);
    };

    useEffect(() => {
        fetchInquiryList();
    }, []);

    if (loading) {
        return <div className="notice-main-section-table">로딩 중...</div>;
    }

    if (error) {
        return <div className="notice-main-section-table">{error}</div>;
    }

    return (
        <div className="inquiry-main-section-table">
            <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => console.log('글쓰기 버튼')} detailFunc={handleSelectInquiry} />
        </div>
    );
};

export default CustomerInquiryListPage;