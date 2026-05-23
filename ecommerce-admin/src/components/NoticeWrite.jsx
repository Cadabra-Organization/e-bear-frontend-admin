import "./NoticeWrite.css";
import Editor from "./Editor";
import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoticeWrite = () => {
    const navigate = useNavigate();
    const { notificationNo } = useParams();

    const isEditMode = !!notificationNo;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!isEditMode) return;

        const fetchNoticeDetail = async () => {
            try {
                const response = await api.get(`/notification/detail/${notificationNo}`);
                const notice = response.data;

                setTitle(notice.title || "");
                setContent(notice.content || "");
            } catch (err) {
                console.error("공지사항 수정용 상세 조회 실패:", err);
                console.error(err.response?.status);
                console.error(err.response?.data);
                alert("공지사항 정보를 불러오지 못했습니다.");
                navigate("/notice");
            }
        };

        fetchNoticeDetail();
    }, [isEditMode, notificationNo, navigate]);

    const onClickEvent = async () => {
        try {
            if (isEditMode) {
                await api.put(`/notification/update/${notificationNo}`, {
                    title,
                    content,
                });

                alert("공지사항이 수정되었습니다.");
            } else {
                await api.post("/notification/write", {
                    title,
                    content,
                });

                alert("공지사항이 등록되었습니다.");
            }
            navigate("/notice");
        } catch (err) {
            console.error("등록 실패:", err);
            console.error(err.response?.status);
            console.error(err.response?.data);
        }
    };

    return (
        <>
            <div className="editor-container">
                <div className="editor-wrapper">
                    {/* 제목 입력창 */}
                    <input
                        className="editor-title-input"
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* 에디터 */}
                    <Editor
                        value={content}
                        onChange={setContent}
                    />

                    {/* 버튼 영역 */}
                    <div className="editor-actions">
                        <button
                            className="btn cancel"
                            onClick={() => navigate("/notice")}
                        >취소</button>
                        <button onClick={onClickEvent} className="btn submit">
                            {isEditMode ? "수정" : "등록"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoticeWrite;