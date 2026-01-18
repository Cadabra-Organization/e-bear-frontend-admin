import React from 'react';
import './PopUp.css';

function PopUp({ isOpen, onClose, title, component}) {
    if (!isOpen) return null;
    
    return (
        <div className={`layer-popup-overlay ${isOpen ? 'show' : ''}`}>
            <div className={"layer-popup-content"}>
                <div className='popup-header'>
                    <p className="main-message">{title}</p>
                    <button className="popup-close-btn" onClick={onClose}>&times;</button>
                </div>
                
                {component}
            </div>
        </div>
    );
}

export default PopUp;
