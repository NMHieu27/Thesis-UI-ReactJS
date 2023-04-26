import { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAPI from '~/api/authAPI/authAPI';
import InputItem from '~/components/Form/InputItem/InputItem';
// Firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '~/firebase';

function Signup() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const avatar = useRef();
    const [loading, setLoading] = useState(false);
    // const [err, setErr] = useState('');
    const nav = useNavigate();

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
                                    displayName:user.firstName,
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
                    nav('/auth/dang-nhap');
                }
                // else setErr('Hệ thống đang bị lỗi! Vui lòng quay lại sau!');
                else toast.error('Hệ thống đang bị lỗi! Vui lòng quay lại sau!');
            } catch {
                // setErr('Username đã tồn tại!');
                toast.error('Username đã tồn tại!');
            } finally {
                setLoading(false);
            }
        };

        // if (user.username === '' || user.password === '') setErr('Username hoặc password không được rỗng!');
        if (user.username === '' || user.password === '') toast.error('Username hoặc password không được rỗng!');
        // else if (user.password !== user.confirmPassword) setErr('Mật khẩu không khớp!');
        else if (user.password !== user.confirmPassword) toast.error('Mật khẩu không khớp!');
        else {
            setLoading(true);
            process();
        }
    };

    return (
        <>
            <h1 className="text-center text-success">ĐĂNG KÝ NGƯỜI DÙNG</h1>

            {/* {err ? <div className="alert alert-danger">{err}</div> : ''} */}

            <Form onSubmit={register}>
                <InputItem
                    label="Tên người dùng"
                    value={user.firstName}
                    controlId="firstName"
                    type="text"
                    setValue={(e) => setUser({ ...user, firstName: e.target.value })}
                />
                <InputItem
                    label="Họ và chữ lót"
                    value={user.lastName}
                    controlId="lastName"
                    type="text"
                    setValue={(e) => setUser({ ...user, lastName: e.target.value })}
                />
                <InputItem
                    label="Tên đăng nhập"
                    value={user.username}
                    controlId="username"
                    type="text"
                    setValue={(e) => setUser({ ...user, username: e.target.value })}
                />
                <InputItem
                    label="Email OU"
                    value={user.email}
                    controlId="email"
                    type="email"
                    setValue={(e) => setUser({ ...user, email: e.target.value })}
                    pattern="^^[a-zA-Z0-9._%+-]+@ou\.edu\.vn$"
                    error="Vui lòng nhập đúng định dạng email trường cấp!"
                />
                <InputItem
                    label="Mật khẩu"
                    value={user.password}
                    controlId="password"
                    type="password"
                    setValue={(e) => setUser({ ...user, password: e.target.value })}
                />
                <InputItem
                    label="Xác nhận mật khẩu"
                    value={user.confirmPassword}
                    controlId="confirmPassword"
                    type="password"
                    setValue={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                />
                <InputItem label="Ảnh đại diện" controlId="avatar" type="file" ref={avatar} />

                {/* {loading?<Loading />:<Button variant="primary" type="submit">Đăng ký</Button>}
                 */}
                <Button variant="primary" type="submit">
                    Đăng ký
                </Button>
            </Form>
        </>
    );
}
export default Signup;
