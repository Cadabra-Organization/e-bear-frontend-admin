import "./Header.css";

const Header = ({notice, titleInfo}) => {
    return (
        <>
            <div className='top-info-container'>로그인/로그아웃</div>
            <div className='notice-info-container'>
                <span className='notice-data'>{notice.content}</span>
            </div>
            <div className="title-data">
                <span className="title-text">{titleInfo.title}</span>
                <hr className="title-line"/>
            </div>
        </>
    );
}

export default Header;