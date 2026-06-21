import "./Navigation.css";
import { ChevronDownIcon, HomeIcon, ChevronRightIcon } from '../components/CustomTag'
import { Link } from "react-router-dom";
import React, { useState } from 'react';

const Navigation = ({navigation}) => {
    const [openStates, setOpenStates] = useState({});
    const toggleMenu = (index) => {
        setOpenStates(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className='side-navigation'>
            {navigation.map((data, index) => (
                <div key={index}>
                    <div
                        className="side-menu"
                        onClick={() => data.subMenu && toggleMenu(index)}
                    >
                        <div className="side-menu-subject-section">
                            <HomeIcon className="home-icon" />

                            <Link to={data.url}>
                                <span className="side-menu-subject">
                                    {data.subject}
                                </span>
                            </Link>
                        </div>

                        {data.subMenu ?
                                <ChevronDownIcon className="nav-icon" />
                                : <ChevronRightIcon className="nav-icon" />}
                    </div>

                    {data.subMenu && (
                        <div
                            className={`sub-list ${
                                openStates[index] ? "open" : ""
                            }`}
                        >
                            <Navigation navigation={data.subMenu} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Navigation;