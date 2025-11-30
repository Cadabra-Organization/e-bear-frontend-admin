import PropTypes from 'prop-types';
import "./NoticePage.css";
import Header from "../components/Header";
import DataTable from "../components/DataTable"; 

const NoticePage = ({ notice }) => {
    const pageInfo = {
        pageType: '공지사항'
    };

    return (
        <>
            <Header notice={notice} />
            <div className='main-section'>
                <DataTable pageInfo={pageInfo} />
            </div>
        </>
    );
};

NoticePage.propTypes = {
    notice: PropTypes.shape({
        content: PropTypes.string.isRequired,
    }),
};

NoticePage.defaultProps = {
    notice: {
        content: '[알림] [안내] 공식대행사 대행관 설정 가이드 공지 및 불법영업 행위 주의 안내'
    }
};

export default NoticePage;