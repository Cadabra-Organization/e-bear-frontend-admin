import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "./CustomerReport.css";

const CustomerReport = () => {
    const { reportNo } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    const formatDateTime = (dateTime) => {
        if (!dateTime) { return "-"; }
        return dateTime.replace("T", " ").substring(0, 16);
    };

    const fetchReportDetail = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(`/report/admin/detail/${reportNo}`);

            console.log("고객신고 상세 조회:", response.data);

            setReport(response.data);

            // 기존 답변이 있으면 입력창에 표시하고,
            // 답변이 없으면 빈 문자열을 넣는다.
            setAnswer(response.data.answerContent ?? "");
        } catch (err) {
            console.error("고객신고 상세 조회 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);

            setError("고객신고 상세 내용을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!answer.trim()) {
            alert("답변 내용을 입력해 주세요.");
            return;
        }

        try {
            setSaving(true);

            const response = await api.put(
                `/report/admin/detail/${reportNo}/answer`,
                {
                    content: answer,
                }
            );

            console.log("고객신고 답변 저장:", response.data);

            setReport(response.data);
            setAnswer(response.data.answerContent ?? "");

            alert("답변이 저장되었습니다.");
        } catch (err) {
            console.error("고객신고 답변 저장 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);

            if (err.response?.status === 400) {
                alert("답변 내용을 확인해 주세요.");
            } else {
                alert("답변 저장에 실패했습니다.");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleGoList = () => { navigate("/report"); };

    useEffect(() => {
        fetchReportDetail();
    }, [reportNo]);

    if (loading) {
        return (
            <div className="main-section">
                로딩 중...
            </div>
        );
    }

    if (error) {
        return (
            <div className="main-section">
                <p>{error}</p>

                <div className="button-group">
                    <button
                        className="btn btn-list"
                        onClick={handleGoList}
                    >
                        목록
                    </button>
                </div>
            </div>
        );
    }

    if (!report) {
        return null;
    }

    return (
        <div className='main-section'>
            <div className="page-header">
                <h2>고객신고</h2>
            </div>

            <table className="report-table">
                <colgroup>
                    <col width="15%" />
                    <col width="35%" />
                    <col width="15%" />
                    <col width="35%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>제품명</th>
                        <td>{report.productName}</td>
                        <th>답변상태</th>
                        <td className='answer-status'>
                            <span className={report.answered ? "answer-complete" : "answer-no-complete"}>
                                {report.answered ? "답변완료" : "미답변"}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>고객명</th>
                        <td colSpan="3">{report.customerName}{" "}({report.customerId})</td>
                    </tr>
                    <tr>
                        <th>등록일시</th>
                        <td colSpan="3">{formatDateTime(report.reportRegDt)}</td>
                    </tr>
                </tbody>
            </table>

            <table className="report-table">
                <colgroup>
                    <col width="15%" />
                    <col width="85%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td>{report.title}</td>
                    </tr>
                    <tr>
                        <th className="content-th">신고내용</th>
                        <td className="content-td">
                            {report.reportContent}
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="report-table answer-section">
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

            <table className="report-table">
                <colgroup>
                    <col width="15%" />
                    <col width="35%" />
                    <col width="15%" />
                    <col width="35%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>답변 등록<br />일시</th>
                        <td>{formatDateTime(report.respondDt)}</td>
                        <th>답변 등록<br />담당자</th>
                        <td>{report.responder ?? "-"}</td>
                    </tr>
                </tbody>
            </table>

            <div className="button-group">
                <button className="btn btn-list" onClick={handleGoList} disabled={saving}>목록</button>
                <button className="btn btn-save" onClick={handleSave} disabled={saving}>{saving ? "저장 중..." : "저장"}</button>
            </div>

        </div>
    );
};

export default CustomerReport;