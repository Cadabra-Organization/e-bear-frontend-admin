import PropTypes from 'prop-types';
import "./SideNavigation.css";
import { Avatar, AvatarFallback, UserIcon } from './CustomTag';
import Navigation from "./Navigation";

const SideNavigation = ({ userInfo, navigation, onNavigationClick, currentPage }) => {
    return (
        <div className='side-menu-container'>
            <div className='side-menu-top'>
                <div>
                    <span className='logo'>eBEAR</span>
                    <span className='logo-name'>파트너센터</span>
                </div>
                <div className='avatar-section'>
                    <Avatar className="seller-avatar">
                        <AvatarFallback className="avatar-fallback">
                            <UserIcon className="seller-avatar-icon" />
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className='user-info-section'>
                    <span className='user-name'>{userInfo.name}</span>
                    <span className='user-email'>{userInfo.email}</span>
                </div>
            </div>
            <hr/>
            <Navigation 
                navigation={navigation} 
                onNavigationClick={onNavigationClick}
                currentPage={currentPage}
            />
        </div>
    );
};

SideNavigation.propTypes = {
    userInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            subject: PropTypes.string.isRequired,
            url: PropTypes.string,
        })
    ).isRequired,
    onNavigationClick: PropTypes.func.isRequired,
    currentPage: PropTypes.string.isRequired,
};

export default SideNavigation;