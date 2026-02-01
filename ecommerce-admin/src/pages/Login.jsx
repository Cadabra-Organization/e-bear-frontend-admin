import { useState } from "react";
import "./Login.css";

const Login = () => {
    return (
        <div className='login-main-container'>
            <div className='login-flex-container'>
                <div className="login-container">
                    <div>
                        <h1 className="login-title">eBear</h1>
                    </div>
                    <div>
                        <div>
                            <input className="login-input" type="text" placeholder="ID" />
                            <input className="login-input" type="password" placeholder="Password" />
                            <button className="login-button">Login</button>

                            <label className="login-checkbox-label" for="autoLogin">
                                <div>
                                    <input className="login-checkbox" type="checkbox" id="autoLogin" />
                                    <span className="login-checkbox-span"></span>
                                    <span className="login-checkbox-text">자동로그인</span>
                                </div>
                            </label>
                        </div>
                        <div className="login-link-container">
                            <a className="login-link" href="">아이디 찾기</a>
                            <a className="login-link" href="">비밀번호 찾기</a>
                            <a className="login-link" href="">회원가입</a>
                        </div>
                        <div className="login-social-button-container">
                            <div className="login-social-button-item">
                                <a href="#" className="login-social-button"></a>
                                <span className="login-social-button-text">Google</span>
                            </div>
                            <div className="login-social-button-item">
                                <a href="#" className="login-social-button"></a>
                                <span className="login-social-button-text">Kakao</span>
                            </div>
                            <div className="login-social-button-item">
                                <a href="#" className="login-social-button"></a>
                                <span className="login-social-button-text">Naver</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;