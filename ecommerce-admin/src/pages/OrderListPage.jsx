import { useState, useMemo, useEffect } from 'react';
import "./OrderListPage.css";
import PopUp from '../components/PopUp';
import Receipt from '../components/Receipt';
import DataTable from "../components/DataTable";
import { Button } from "@mui/material";
import api from "../api/axios";

const ORDER_STATUS_LABEL = {
  PAY_DONE: "결제완료",
  SHIPPING: "배송중",
  DELIVERED: "배송완료",
};

const OrderListPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openReceiptPopup = () => setIsOpen(true);
  const handleClosePopup = () => setIsOpen(false);
  const [rows, setRows] = useState([]);

  const fetchOrderList = async () => {
    try {
        const response = await api.get("/order/list");
        const mappedRows = response.data.flatMap((item) => {
      
          if (!item.productOptions || item.productOptions.length === 0) {
            return [{
              num: item.orderPaymentId,
              productName: item.productName,
              quantity: 0,
              price: 0,
              customer: item.receiver || "정보 없음",
              paidDt: item.orderDate, 
              orderStatus: item.orderStatus,
              orderStatusCode: item.orderStatus,
              receipt: (
                <Button variant="outlined" sx={{ backgroundColor: '#000', color: 'white' }} onClick={() => updateProduct(item.paymentId)}>영수증</Button>
              ),
            }];
          }
    
          return item.productOptions.map((option) => ({
            num: item.orderPaymentId,           
            productName: option.productOptionName, 
            quantity: option.quantity,            
            price: option.price,                   
            customer: item.receiver || "정보 없음",  
            paidDt: item.orderDate,               
            orderStatus: item.orderStatus,       
            orderStatusCode: item.orderStatus,
            receipt: (
              <Button variant="outlined" sx={{ backgroundColor: '#000', color: 'white' }} onClick={() => updateProduct(item.paymentId)}>영수증</Button>
            ),
          }));
        });
    
        setRows(mappedRows);
    } catch (err) {
        console.error("상품 목록 조회 실패:", err);
        console.error("status:", err.response?.status);
        console.error("data:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);
  
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

  const searchConfig = {
    showDate: false,      // 날짜 검색 
    showCondition: true, // 검색조건 선택 
    showText: true,      // 검색어 입력 
    showDelete: false,    // 삭제 버튼 
    showWrite: false,      // 글쓰기 버튼
  };

  const labelConfig = {
    statusLabel: "주문상태",
    searchLabel: "검색조건"
  };

  let pageInfo = {
    searchList: {
      all: "전체",
      productName: "제품명",
      customer: "고객명",
    },
    statusList: {
      all: "전체",
      PAY_DONE: "결제완료",
      SHIPPING: "배송중",
      DELIVERED: "배송완료",
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
      id: 'quantity',
      numeric: false,
      disablePadding: false,
      label: '수량',
      width: 70,
      align: 'center',
    },
    {
      id: 'price',
      numeric: false,
      disablePadding: false,
      label: '금액',
      width: 100,
      align: 'center',
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
      id: 'paidDt',
      numeric: true,
      disablePadding: false,
      label: '결제일',
      width: 90,
      align: 'center',
    },
    {
      id: 'orderStatus',
      numeric: false,
      disablePadding: false,
      label: '주문상태',
      width: 90,
      align: 'center',
    },
    {
      id: 'receipt',
      numeric: false,
      disablePadding: false,
      label: '영수증',
      width: 70,
      align: 'center',
    },
  ];

  return (
    <>
      <div className="order-main-section-table">
        <DataTable pageInfo={pageInfo} headCells={headCells} rows={rows} searchConfig={searchConfig} labelConfig={labelConfig} writeFunc={() => console.log('글쓰기 버튼')} selectFunc={() => console.log('')}/>
      </div>
      <PopUp
        isOpen={isOpen}
        onClose={handleClosePopup}
        title={"영수증"}
        component={<Receipt receiptInfo={receiptInfo} />}
      />
    </>
  )
}

export default OrderListPage
