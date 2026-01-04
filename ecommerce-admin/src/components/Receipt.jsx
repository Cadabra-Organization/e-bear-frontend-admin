import "./Receipt.css";

const Receipt = ({receiptInfo}) => {
    return (
        <div>
          <div className="receipt-space-between receipt-margin-bottom">
            <div>결제 방법</div>
            <div>{receiptInfo.paymentMethod}</div>
          </div>
          <div className="receipt-space-between receipt-margin-bottom">
            <div>고유 번호</div>
            <div>{receiptInfo.orderNumber}</div>
          </div>
          <div className="receipt-space-between receipt-margin-bottom">
            <div>결제 일시</div>
            <div>{receiptInfo.orderDate}</div>
          </div>
          <div className="receipt-space-between receipt-margin-bottom">
            <div>판매자</div>
            <div>{receiptInfo.seller}</div>
          </div>
          <hr className="receipt-hr" />
          <div>
            
            <table className="receipt-table">
                <thead>
                    <tr>
                        <th align="left">상품명</th>
                        <th>수량</th>
                        <th  align="right">가격</th>
                    </tr>
                </thead>
                <tbody>
                    {receiptInfo.orderList.map((data) => 
                    <tr>
                        <td align="left">{data.productName}</td>
                        <td>{data.amount}</td>
                        <td align="right">{data.price}</td>
                    </tr>
                    )}
                </tbody>
            </table>

          </div>
          <hr className="receipt-hr" />
          <div className="receipt-space-between">
            <div>합계</div>
            <div>{receiptInfo.totalAmount}원</div>
          </div>
          <div className="receipt-space-between">
            <div>할인정보</div>
            <div>{receiptInfo.discountInfo}</div>
          </div>

          <div className="receipt-space-between receipt-margin-top">
            <div>총 결제금액</div>
            <div>{receiptInfo.orderAmount}원</div>
          </div>
        </div>
    );
}

export default Receipt;