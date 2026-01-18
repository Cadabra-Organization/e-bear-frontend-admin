import React from 'react';
import './CouponPublicationPopUp.css';

function CouponPublicationPopUp() {
    return (
        <div className="coupon-popup">
            {/* 쿠폰유형 */}
            <div className="coupon-row">
                <span className="label">쿠폰유형</span>
                <div className="content radio-group">
                    <label>
                        <input type='radio' name='couponType' value='category' defaultChecked />
                        <span>카테고리별</span>
                    </label>
                    <label>
                        <input type='radio' name='couponType' value='product' />
                        <span>제품별</span>
                    </label>
                </div>
            </div>

            {/* 할인율 */}
            <div className="coupon-row">
                <span className="label">할인율</span>
                <div className="content split-input">
                    <select className="coupon-select">
                        <option>퍼센트/절대값</option>
                        <option>퍼센트 (%)</option>
                        <option>절대값 (원)</option>
                    </select>
                    <input type='text' className="coupon-input" />
                </div>
            </div>

            {/* 쿠폰이름 */}
            <div className="coupon-row">
                <span className="label">쿠폰이름</span>
                <div className="content">
                    <input type='text' className="coupon-input full" />
                </div>
            </div>

            {/* 발행처 */}
            <div className="coupon-row">
                <span className="label">발행처</span>
                <div className="content">
                    <input type='text' className="coupon-input full" />
                </div>
            </div>

            {/* 수량 */}
            <div className="coupon-row">
                <span className="label">수량</span>
                <div className="content">
                    <input type='text' className="coupon-input full" />
                </div>
            </div>

            {/* 만료일 */}
            <div className="coupon-row">
                <span className="label">만료일</span>
                <div className="content">
                    <input type='text' className="coupon-input full" />
                </div>
            </div>

            {/* 조건구매 */}
            <div className="coupon-row">
                <span className="label">
                    <input type="checkbox" id="condition" />
                    <label htmlFor="condition">조건 구매</label>
                </span>
                <div className="content">
                    <input type='text' className="coupon-input full" />
                </div>
            </div>

            {/* 버튼 영역 */}
            <div className="coupon-actions">
                <button className="btn-save">저장</button>
                <button className="btn-cancel">취소</button>
            </div>
        </div>
    );
}

export default CouponPublicationPopUp;
