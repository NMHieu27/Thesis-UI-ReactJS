import { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAPI from '~/api/authAPI/authAPI';
import InputItem from '~/components/Form/InputItem/InputItem';
// Firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '~/firebase';
import Helmet from '~/components/Helmet/Helmet';
import Loading from '~/components/Loading/Loading';
import { majorData } from '~/fakedata/major';
import { roleData } from '~/fakedata/role';
import { Dropdown } from 'primereact/dropdown';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
function AddUser() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        major: '',
    });
    const [majors, setMajors] = useState();
    const [roles, setRoles] = useState();
    const [img, setImg] = useState(null);
    const avatar = useRef();
    const [loading, setLoading] = useState(false);
    // const [err, setErr] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        // Call api here
        //
        setMajors(majorData);
        setRoles(roleData);
    }, []);
    const register = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                let form = new FormData();
                form.append('first_name', user.firstName);
                form.append('last_name', user.lastName);
                form.append('username', user.username);
                form.append('email', user.email);
                form.append('password', user.password);
                form.append('role', user.role);
                form.append('major',user.major);
                if (avatar.current.files.length > 0) form.append('avatar', avatar.current.files[0]);

                let res = await authAPI.signUp(form);
                if (res.status === 201) {
                    // firebase
                    //Create user
                    const res = await createUserWithEmailAndPassword(auth, user.email, user.password);

                    //Create a unique image name
                    const date = new Date().getTime();
                    const storageRef = ref(storage, `${user.firstName + date}`);
                    await uploadBytesResumable(storageRef, avatar.current.files[0]).then(() => {
                        getDownloadURL(storageRef).then(async (downloadURL) => {
                            try {
                                //Update profile
                                await updateProfile(res.user, {
                                    displayName: user.firstName,
                                    photoURL: downloadURL,
                                });
                                //create user on firestore
                                await setDoc(doc(db, 'users', res.user.uid), {
                                    uid: res.user.uid,
                                    displayName: user.firstName,
                                    email: user.email,
                                    photoURL: downloadURL,
                                });

                                //create empty user chats on firestore
                                await setDoc(doc(db, 'userChats', res.user.uid), {});
                            } catch (err) {
                                console.log(err);
                            }
                        });
                    });
                    // firebase
                    toast.success('Đăng kí tài khoản thành công');
                    nav(-1);
                } else toast.error('Hệ thống đang bị lỗi! Vui lòng quay lại sau!');
            } catch {
                toast.error('Username đã tồn tại!');
            } finally {
                setLoading(false);
            }
        };

        if (user.username === '' || user.password === '') toast.error('Username hoặc password không được rỗng!');
        else if (user.password !== user.confirmPassword) toast.error('Mật khẩu không khớp!');
        else {
            console.log(user);
            setLoading(true);
            process();
        }
    };

    return (
        <Helmet title="Đăng kí tài khoản">
            <div className="signup-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    ĐĂNG KÝ NGƯỜI DÙNG
                </h2>
                <div className="signup-container">
                    <Form onSubmit={register}>
                        <Row>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Tên người dùng"
                                    value={user.firstName}
                                    controlId="firstName"
                                    type="text"
                                    setValue={(e) => setUser({ ...user, firstName: e.target.value })}
                                />
                            </Col>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Họ và chữ lót"
                                    value={user.lastName}
                                    controlId="lastName"
                                    type="text"
                                    setValue={(e) => setUser({ ...user, lastName: e.target.value })}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Tên đăng nhập"
                                    value={user.username}
                                    controlId="username"
                                    type="text"
                                    setValue={(e) => setUser({ ...user, username: e.target.value })}
                                />
                            </Col>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Email OU"
                                    value={user.email}
                                    controlId="email"
                                    type="email"
                                    setValue={(e) => setUser({ ...user, email: e.target.value })}
                                    pattern="^^[a-zA-Z0-9._%+-]+@ou\.edu\.vn$"
                                    error="Vui lòng nhập đúng định dạng email trường cấp!"
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Mật khẩu"
                                    value={user.password}
                                    controlId="password"
                                    type="password"
                                    setValue={(e) => setUser({ ...user, password: e.target.value })}
                                />
                            </Col>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Xác nhận mật khẩu"
                                    value={user.confirmPassword}
                                    controlId="confirmPassword"
                                    type="password"
                                    setValue={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} xs={12}>
                                <Form.Label>Khoa</Form.Label>
                                <div className="card mb-3">
                                    <Dropdown
                                        value={user.major}
                                        onChange={(e) => setUser({ ...user, major: e.target.value })}
                                        options={majors}
                                        optionLabel="name"
                                        placeholder="Chọn khoa"
                                        filter
                                    />
                                </div>
                            </Col>
                            <Col xl={6} xs={12}>
                                <Form.Label>Phân quyền người dùng</Form.Label>
                                <div className="card mb-3">
                                    <Dropdown
                                        value={user.role}
                                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                                        options={roles}
                                        optionLabel="name"
                                        placeholder="Chọn quyền"
                                        filter
                                    />
                                </div>
                            </Col>
                        </Row>
                        <InputItem
                            label="Ảnh đại diện"
                            controlId="avatar"
                            type="file"
                            ref={avatar}
                            setValue={(e) => setImg(e.target.files[0])}
                        />
                        <div className="signup-avatar-container text-center mb-4">
                            {img && (
                                <img
                                    src={URL.createObjectURL(img)}
                                    width="100"
                                    height="100"
                                    className="rounded-circle"
                                    alt="err"
                                />
                            )}
                        </div>
                        <div className="btn-signup-container text-center">
                            <ButtonSubmit content='Đăng kí' loading={loading}/>
                        </div>
                    </Form>
                </div>
            </div>
        </Helmet>
    );
}
export default AddUser;
