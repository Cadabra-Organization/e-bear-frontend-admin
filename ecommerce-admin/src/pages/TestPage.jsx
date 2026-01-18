import { useState } from 'react';
import PopUp from '../components/PopUp';
import CouponPublicationPopUp from '../components/CouponPublicationPopUp';
import Receipt from '../components/Receipt';

function TestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleReviewPopup = () => {
    setIsOpen(false);
  }

  const receiptInfo = {
    paymentMethod: '신용카드',
    orderNumber: '1234567890',
    orderDate: '2025-01-01 19:15:33',
    orderAmount: 100000,
    seller: '드라이기만 판매하는 판매자',
    totalAmount: 100000,
    discountInfo: '30%',
    orderList: [
      {productName:"드라이기", amount:"1", price: "10,000원"},
      {productName:"드라이기", amount:"1", price: "10,000원"},
      {productName:"드라이기", amount:"1", price: "10,000원"}
    ]
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Popup</button>
      <PopUp
        isOpen={isOpen}
        onClose={(handleReviewPopup)}
        title={"쿠폰발행"}
        // component={<CouponPublicationPopUp/>}
        component={<Receipt receiptInfo={receiptInfo} />}
      />
    </>
  )
}

export default TestPage
