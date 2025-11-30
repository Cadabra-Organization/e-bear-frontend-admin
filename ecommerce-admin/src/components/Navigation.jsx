import PropTypes from 'prop-types';
import "./Navigation.css";
import { ChevronDownIcon, HomeIcon } from '../components/CustomTag';

const Navigation = ({ navigation, onNavigationClick, currentPage }) => {
    const handleClick = (subject) => {
        onNavigationClick?.(subject);
    };

    return (
        <div className='side-navigation'>
            {navigation.map((item) => {
                const isActive = currentPage === item.subject;
                
                return (
                    <div 
                        key={item.subject}
                        className={`side-menu ${isActive ? 'active' : ''}`}
                        onClick={() => handleClick(item.subject)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className='side-menu-subject-section'>
                            <HomeIcon className='home-icon'/>
                            <span className='side-menu-subject'>{item.subject}</span>
                        </div>
                        <ChevronDownIcon className='chevron-down-icon'/>
                    </div>
                );
            })}
        </div>
    );
};

Navigation.propTypes = {
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            subject: PropTypes.string.isRequired,
            url: PropTypes.string,
        })
    ).isRequired,
    onNavigationClick: PropTypes.func,
    currentPage: PropTypes.string.isRequired,
};

Navigation.defaultProps = {
    onNavigationClick: null,
};

export default Navigation;