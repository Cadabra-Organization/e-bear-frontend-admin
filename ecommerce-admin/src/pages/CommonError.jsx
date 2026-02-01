import { useState } from 'react';
import "./CommonError.css";
import errorImage from "../assets/images/error.png";
const CommonError = () => {
    const errorTitle = "마법이 잠시 풀렸어요!";
    const errorContent = "카다브라와 이베어가 열심히 복구 중입니다. 잠시 후 다시 시도해 주세요.";

    return (
        <div className='error-container'>
            <div className='error-flex-container'>
                <div className='error-image-container'>
                    <img className='error-image' src={errorImage} alt="Error" />
                    <div className='error-title'>
                        <h1>{errorTitle}</h1>
                    </div>
                    <div className='error-content'>
                        <p>{errorContent}</p>
                    </div>
                    <div className='error-button-container'>
                        <button className='error-button'>홈으로 이동</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonError;