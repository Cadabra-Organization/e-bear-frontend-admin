import "./Header.css";

const Header = ({notice}) => {
    return (
        <>
            <div className='top-info-container'>로그인/로그아웃</div>
            <div className='notice-info-container'>
                <span className='notice-data'>{notice.content}</span>
            </div>
        </>
    );
}

export default Header;