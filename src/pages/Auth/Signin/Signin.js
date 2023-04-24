import {  useEffect, useState } from 'react';
import './Sigin.scss';
import Helmet from 'src/components/Helmet/Helmet';
import LoginSVG from 'src/assets/svg/illustrations-login/LoginSVG';
import { Button, Form } from 'react-bootstrap';
import InputItem from 'src/components/Form/InputItem/InputItem';
import { Link, useNavigate } from 'react-router-dom';
import authAPI from 'src/api/authAPI/authAPI';
import { loginSuccess } from 'src/redux/actions/authActions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
function Signin({ dispatch }) {
    const [loadSVG, setLoadSVG] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const nav = useNavigate();
    useEffect(() => {
        const $ = document.querySelector.bind(document);
        const title = $('.title');
        const shape = $('.shape-wave svg');
        const hey = $('.greeting-container h2');
        setTimeout(() => {
            title.style.left = '5%';
            shape.style.height = '100%';
            shape.style.opacity = '1';
            hey.classList.add('swing-animated');
            setLoadSVG(true);
        }, 200);
    }, []);

    const login = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                const params = {
                    username: username,
                    password: password,
                    client_id: 'CshxXj0PHnLcCkwtGSZWxPJc7G2lEA2iNjE9ISJc',
                    client_secret:
                        '5LMYy3tSWofUxcRGj7qNRSgyYe7WZtmXWCMuVtVrYAJRITuA5TqpvRAw7bKpRqK8sRdJEoybnVhjtvt0DiLqSKOusqpffw8xLaYoupGKDIY47nDF0hfc3EB69SVMZbBI',
                    grant_type: 'password',
                };
                let res = await authAPI.signIn(params);
                localStorage.setItem('access-token', res.data.access_token);
                console.log(localStorage.getItem('access-token'));
                if (localStorage.getItem('access-token')) {
                    let user = await authAPI.currentUser();
                    localStorage.setItem('current-user', JSON.stringify(user.data));

                    toast.success('Đăng nhập thành công');
                    dispatch(loginSuccess(user.data));
                    if (user !== null) {
                        nav('/');
                    }
                }
            } catch (ex) {
                console.error(ex);
                toast.error('Username hoặc Password không hợp lệ!');
            } finally {
                setLoading(false);
            }
        };

        if (username === '' || password === '') {
            toast.error('Phải nhập username và password!');
        } else {
            setLoading(true);
            process();
        }
    };

    return (
        <Helmet title="Đăng nhập">
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="left-login-form">
                        <div className="title">THISIS&nbsp;OU</div>
                        <div className="education-svg">{loadSVG && <LoginSVG />}</div>
                        <div className="shape-wave">
                            <svg
                                id="visual"
                                viewBox="0 0 900 450"
                                width="900"
                                height="450"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                            >
                                <g transform="translate(3.718030203411587 8.468128226926297)">
                                    <path
                                        d="M239.4 -513.1C267.8 -398.3 219.2 -248.4 236.6 -157C254 -65.6 337.5 -32.8 402 37.3C466.6 107.3 512.1 214.7 483.1 285.8C454 357 350.2 392 257.3 469.1C164.3 546.3 82.2 665.7 8 651.8C-66.2 637.9 -132.3 490.9 -231.2 417.1C-330.1 343.4 -461.7 342.9 -492.1 285.6C-522.5 228.3 -451.7 114.2 -408.4 25C-365.1 -64.2 -349.3 -128.3 -305.9 -163.3C-262.6 -198.2 -191.8 -203.9 -136.2 -303.1C-80.7 -402.2 -40.3 -594.9 32.6 -651.3C105.5 -707.7 211 -628 239.4 -513.1"
                                        fill="#00257a"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="login-form-container">
                        <Form onSubmit={login} className="login-form" noValidate={true}>
                            <div className="greeting-container">
                                <h2>Hey!</h2>
                                <h1>WELLCOME BACK</h1>
                            </div>
                            <InputItem
                                label="Username"
                                type="text"
                                value={username}
                                setValue={(e) => setUsername(e.target.value)}
                            />
                            <div className="password-container">
                                <InputItem
                                    label="Password"
                                    type={!isShowPassword ? 'password' : 'text'}
                                    value={password}
                                    setValue={(e) => setPassword(e.target.value)}
                                />
                                <span className="eye" onClick={() => setIsShowPassword(!isShowPassword)}>
                                    {!isShowPassword ? (
                                        <i className="fa-solid fa-eye-slash eye"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye eye"></i>
                                    )}
                                </span>
                            </div>

                            {/* {loading ? (
                                <Loading />
                            ) : ( */}
                            <div className="login-form-action">
                                <Link to={'/ddd'}>Forgot password?</Link>
                                <Button className="btn-lg btn-login" variant="primary" type="submit">
                                    Sign In
                                </Button>
                            </div>

                            {/* )} */}
                        </Form>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default connect()(Signin);
