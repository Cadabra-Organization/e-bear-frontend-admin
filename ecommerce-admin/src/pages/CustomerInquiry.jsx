import { useState } from 'react';
import "./CustomerInquiry.css";

const CustomerInquiry = () => {
    let navigation = [
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' },
        { subject: 'HOME', url: '/admin/home' }
    ];

    let userInfo = {
        name: '이베어',
        email: 'ebear@knou.ac.kr'
    }

    let notice = {
        content: '[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
    }

    const [answer, setAnswer] = useState('');

    return (
        <div className='main-section'>

            <div className="page-header">
                <h2>고객문의</h2>
            </div>

            <table className="inquiry-table">
                <colgroup>
                    <col width="15%" />
                    <col width="35%" />
                    <col width="15%" />
                    <col width="35%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>제품명</th>
                        <td>오브제 헤어 드라이기 UN-B1919N</td>
                        <th>답변상태</th>
                        <td className='answer-status'>
                            <span className="answer-no-complete">미답변</span>
                        </td>
                    </tr>
                    <tr>
                        <th>고객명</th>
                        <td colSpan="3">김철수 (abc111)</td>
                    </tr>
                    <tr>
                        <th>등록일시</th>
                        <td colSpan="3">2025.03.15</td>
                    </tr>
                </tbody>
            </table>

            <table className="inquiry-table">
                <colgroup>
                    <col width="15%" />
                    <col width="85%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td>색상 재문의</td>
                    </tr>
                    <tr>
                        <th className="content-th">문의내용</th>
                        <td className="content-td">
                            안녕하세요. 분홍색 말고 노란색은 없나요? 저는 노란색이 너무 좋아요.
                            노란색이 없으면 하늘색이라도 주세요.
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="inquiry-table answer-section">
                <colgroup>
                    <col width="15%" />
                    <col width="85%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th className="content-th">답변</th>
                        <td className="content-td">
                            <textarea
                                className="answer-textarea"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="inquiry-table">
                <colgroup>
                    <col width="15%" />
                    <col width="35%" />
                    <col width="15%" />
                    <col width="35%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>답변 등록<br />일시</th>
                        <td>-</td>
                        <th>답변 등록<br />담당자</th>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>

            <div className="button-group">
                <button className="btn btn-list">목록</button>
                <button className="btn btn-save">저장</button>
            </div>

        </div>
    );
};

export default CustomerInquiry;