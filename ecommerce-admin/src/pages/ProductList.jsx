import "./ProductList.css";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import PopUp from '../components/PopUp';
import Coupon from '../components/Coupon';


const ProductList = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenPopup = () => setIsOpen(true);
    const handleClosePopup = () => setIsOpen(false);

    const receiptInfo = {
        paymentMethod: '신용카드',
        orderNumber: '1234567890',
        orderDate: '2025-01-01 19:15:33',
        orderAmount: 100000,
        seller: '드라이기만 판매하는 판매자',
        totalAmount: 100000,
        discountInfo: '30%',
        orderList: [
          { productName: "드라이기", amount: "1", price: "10,000원" },
          { productName: "드라이기", amount: "1", price: "10,000원" },
          { productName: "드라이기", amount: "1", price: "10,000원" }
        ]
      }

    // 보여주고 싶은 검색 조건 설정 (SearchHeader를 제어)
    const searchConfig = {
        showCondition: true,  // 검색조건 선택 
        showText: true,       // 검색어 입력 
        showDelete: true,     // 삭제 버튼 
        showWrite: true,      // 글쓰기 버튼 
        showDownload: true,   // 다운로드 버튼 
        showCoupon: true,      // 쿠폰 버튼
    };

    const labelConfig = {
        searchLabel: "검색조건"
    };

    let pageInfo = {
        searchList: {
            'all': '전체',
            'name': '제품명',
            'id': '번호',
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
        },{
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

    function updateProduct(key) {
        navigate('/product/modify/' + key);
    }

    const fetchProductList = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/product/list/admin");
            const mappedRows = response.data.map((item) => ({
                num: item.productId,
                subject: item.productName,
                writer: item.seller,
                regDt: item.regDttm,
                saleStatusValue: item.productStatus,
                modifyBtn: (
                    <Button variant="outlined" sx={{ backgroundColor: '#000', color: 'white' }} onClick={() => updateProduct(item.productId)}>수정하기</Button>
                ),
            }));

            setRows(mappedRows);
        } catch (err) {
            console.error("상품 목록 조회 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);
            setError("상품 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    function selectProduct(key) {
        location.href= import.meta.env.VITE_USER_URL + '/product/view/' + key;
    }

    async function deleteProduct(key) {
        const response = await api.post("/product/delete", {
          key: key  
        });
        
        console.log(response);
    }

    async function handleSearch (obj) {
        const response = await api.get("/product/list/admin", {
            params: {
                type: obj.type,
                keyword: obj.keyword
            }
        });
        
        const mappedRows = response.data.map((item) => ({
            num: item.productId,
            subject: item.productName,
            writer: item.seller,
            regDt: item.regDttm,
            saleStatusValue: item.productStatus,
            modifyBtn: (
                <Button variant="outlined" sx={{ backgroundColor: '#000', color: 'white' }} onClick={() => updateProduct(item.productId)}>수정하기</Button>
            ),
        }));

        setRows(mappedRows);
    };

    useEffect(() => {
        fetchProductList();
    }, []);

    if (loading) {
        return <div className="notice-main-section-table">로딩 중...</div>;
    }

    if (error) {
        return <div className="notice-main-section-table">{error}</div>;
    }

    return (
        <>
            <div className = "notice-main-section-table" >
                <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => navigate('/product/write')} detailFunc={selectProduct} deleteFunc={deleteProduct} handleSearch={handleSearch} couponFunc={handleOpenPopup}/>
            </div >
            <PopUp
            isOpen={isOpen}
            onClose={handleClosePopup}
            title={"쿠폰"}
            component={<Coupon receiptInfo={receiptInfo} />}
        />
      </>
    );
};

export default ProductList;