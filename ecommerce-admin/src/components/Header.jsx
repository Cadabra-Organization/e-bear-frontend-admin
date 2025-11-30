import PropTypes from 'prop-types';
import "./Header.css";

const Header = ({ notice }) => {
    return (
        <>
            <div className='top-info-container'>로그인/로그아웃</div>
            <div className='notice-info-container'>
                <span className='notice-data'>{notice?.content || ''}</span>
            </div>
        </>
    );
};

Header.propTypes = {
    notice: PropTypes.shape({
        content: PropTypes.string.isRequired,
    }),
};

Header.defaultProps = {
    notice: {
        content: ''
    }
};

export default Header;