import "./NoticeWrite.css";
import Editor from "./Editor";

const NoticeWrite = () => {
    return (
        <>
            <div className="editor-container">
                <div className="editor-wrapper">
                    {/* 제목 입력창 */}
                    <input
                        className="editor-title-input"
                        placeholder="제목을 입력해주세요"
                    />

                    {/* 에디터 */}
                    <Editor />

                    {/* 버튼 영역 */}
                    <div className="editor-actions">
                        <button className="btn cancel">취소</button>
                        <button className="btn submit">등록</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoticeWrite;