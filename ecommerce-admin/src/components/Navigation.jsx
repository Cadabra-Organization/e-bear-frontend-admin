import "./Navigation.css";
import { ChevronDownIcon, HomeIcon } from '../components/CustomTag'
import { Link } from "react-router-dom";

const Navigation = ({navigation}) => {
    return (
        <div className='side-navigation'>
            {navigation.map((data, index) => (
                <div className='side-menu' key={index}> 
                    <div className='side-menu-subject-section'>
                        <HomeIcon className='home-icon'/>
                        <Link to={data.url}><span className='side-menu-subject'>{data.subject}</span></Link>
                    </div>
                    {/* <ChevronDownIcon className='chevron-down-icon'/> */}
                </div>
            ))}
        </div>
    );
}

export default Navigation;