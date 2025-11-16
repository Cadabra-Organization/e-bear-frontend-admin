import "./Navigation.css";
import { ChevronDownIcon, HomeIcon } from '../components/CustomTag'

const Navigation = ({navigation}) => {
    return (
        <div className='side-navigation'>
            {navigation.map((data) => (
                <div className='side-menu'>
                    <div className='side-menu-subject-section'>
                        <HomeIcon className='home-icon'/>
                        <span className='side-menu-subject'>{data.subject}</span>
                    </div>
                    <ChevronDownIcon className='chevron-down-icon'/>
                </div>
            ))}
        </div>
    );
}

export default Navigation;