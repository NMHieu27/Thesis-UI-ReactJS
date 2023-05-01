import { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAPI from '~/api/authAPI/authAPI';
import InputItem from '~/components/Form/InputItem/InputItem';
import Helmet from '~/components/Helmet/Helmet';
import { majorData } from '~/fakedata/major';
import { roleData } from '~/fakedata/role';
import { Dropdown } from 'primereact/dropdown';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import { usersData } from '~/fakedata/users';
function EditUser() {
    const { userID } = useParams();
    const [user, setUser] = useState({});
    const [majors, setMajors] = useState();
    const [roles, setRoles] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [img, setImg] = useState(null);
    const avatar = useRef();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        // Call api here
        //
        setUser(usersData[userID - 1]);
        setMajors(majorData);
        setRoles(roleData);
    }, []);
    const editUser = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                let form = new FormData();
                form.append('id', user.id);
                form.append('first_name', user.first_name);
                form.append('last_name', user.last_name);
                form.append('username', user.username);
                form.append('email', user.email);
                form.append('password', password);
                form.append('role', user.role);
                form.append('major', user.major);
                form.append('status', user.status);
                if (avatar.current.files.length > 0) {
                    form.append('avatar', avatar.current.files[0]);
                } else {
                    form.append('avatar', user.img);
                }
                // Xem dữ liệu
                // Lấy ra các cặp key/value trong FormData
                for (let pair of form.entries()) {
                    console.log(pair[0] + ': ' + pair[1]);
                }

                // let res = await authAPI.signUp(form);
                //     if (res.status === 201) {
                //         toast.success('Đăng kí tài khoản thành công');
                //         nav(-1);
                //     } else toast.error('Hệ thống đang bị lỗi! Vui lòng quay lại sau!');
                // } catch {
                //     toast.error('Username đã tồn tại!');
            } finally {
                setLoading(false);
            }
        };

        if (user.username === '' || password === '') toast.error('Username hoặc password không được rỗng!');
        else if (password !== confirmPassword) toast.error('Mật khẩu không khớp!');
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
                    Chỉnh sửa tài khoản
                </h2>
                <div className="signup-container">
                    <Form onSubmit={editUser}>
                        <Row>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Tên người dùng"
                                    value={user?.first_name}
                                    controlId="firstName"
                                    type="text"
                                    setValue={(e) => setUser({ ...user, first_name: e.target.value })}
                                />
                            </Col>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Họ và chữ lót"
                                    value={user?.last_name}
                                    controlId="lastName"
                                    type="text"
                                    setValue={(e) => setUser({ ...user, last_name: e.target.value })}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Tên đăng nhập"
                                    value={user?.username}
                                    controlId="username"
                                    type="text"
                                    setValue={(e) => setUser({ ...user, username: e.target.value })}
                                />
                            </Col>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Email OU"
                                    value={user?.email}
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
                                    value={password}
                                    controlId="password"
                                    type="password"
                                    setValue={(e) => setPassword(e.target.value)}
                                />
                            </Col>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Xác nhận mật khẩu"
                                    value={confirmPassword}
                                    controlId="confirmPassword"
                                    type="password"
                                    setValue={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} xs={12}>
                                <Form.Label>Khoa</Form.Label>
                                <div className="card mb-3">
                                    <Dropdown
                                        value={user?.major}
                                        onChange={(e) => setUser({ ...user, major: e.value })}
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
                                        value={user?.role}
                                        onChange={(e) => setUser({ ...user, role: e.value })}
                                        options={roles}
                                        optionLabel="name"
                                        placeholder="Chọn quyền"
                                        filter
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} xs={12}>
                                <InputItem
                                    label="Ảnh đại diện"
                                    controlId="avatar"
                                    type="file"
                                    ref={avatar}
                                    setValue={(e) => setImg(e.target.files[0])}
                                />
                            </Col>
                            <Col xl={6} xs={12}>
                                <Form.Label>Trạng thái</Form.Label>
                                <div className="card mb-3">
                                    <Dropdown
                                        value={user?.status}
                                        onChange={(e) => setUser({ ...user, status: e.value })}
                                        options={[0, 1]}
                                        placeholder="Chọn trạng thái"
                                        valueTemplate={(option) => (option === 0 ? 'Khoá' : 'Không khóa')}
                                        itemTemplate={(option) => (option === 0 ? 'Khoá' : 'Không khóa')}
                                        filter
                                    />
                                </div>
                            </Col>
                        </Row>

                        <div className="signup-avatar-container text-center mb-4">
                            <img
                                src={img === null ? user?.img : URL.createObjectURL(img)}
                                width="100"
                                height="100"
                                className="rounded-circle"
                                alt="err"
                            />
                        </div>
                        <div className="btn-signup-container text-center">
                            <ButtonSubmit content="Lưu" loading={loading} />
                        </div>
                    </Form>
                </div>
            </div>
        </Helmet>
    );
}
export default EditUser;
