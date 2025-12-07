import "./Navigation.css";
import { ChevronDownIcon, HomeIcon } from '../components/CustomTag'

const Navigation = ({navigation}) => {
    return (
        <div className='side-navigation'>
            {navigation.map((data, index) => (
                <div className='side-menu' key={index}> 
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