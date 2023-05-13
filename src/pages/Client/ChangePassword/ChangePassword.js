import { useState } from 'react';
import './ChangePassword.scss';
import { Col, Form, Row } from 'react-bootstrap';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import InputItem from '~/components/Form/InputItem/InputItem';
import Helmet from '~/components/Helmet/Helmet';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import authAPI from '~/api/authAPI/authAPI';
import { auth } from '~/firebase';
import { signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const nav = useNavigate();
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = useState();
    const user = useSelector((state) => state.auth.user);
    const handleChangePassword = (evt) => {
        evt.preventDefault();
        const process = async () => {
            const param = {
                userID: user.id,
                old_password: oldPassword,
                new_password: newPassword,
            };
            console.log(param);
            try {
                // Đổi mật khẩu của người dùng firebase
                const userUpPass = auth.currentUser;
                 await updatePassword(userUpPass,newPassword);
                const res = await authAPI.changePassword(JSON.stringify(param));
                toast.success('Đổi password thành công!');
                setLoading(false);
                nav('/');
            } catch {
                toast.error('Đổi password thất bại!');
                setLoading(false);
            }
        };
        if (newPassword !== confirmNewPassword) {
            setLoading(false);
            toast.error('Xác nhận mật khẩu mới không khớp');
        } else {
            setLoading(true);
            process();
        }
    };
    return (
        <Helmet title="Thay đổi mật khẩu">
            <div className="change-password-wrapper mt-4 pt-4">
                <Row>
                    <Col xl={6} xs={12}>
                        <div className="change-password-img"></div>
                    </Col>
                    <Col xl={6} xs={12} className="p-4">
                        <Form onSubmit={handleChangePassword}>
                            <h2 className="p-4 text-center txt-main-color">Thay đổi mật khẩu</h2>
                            <InputItem
                                value={oldPassword}
                                setValue={(e) => setOldPassword(e.target.value)}
                                type="password"
                                label="Nhập mật khẩu cũ"
                            />
                            <InputItem
                                value={newPassword}
                                setValue={(e) => setNewPassword(e.target.value)}
                                type="password"
                                label="Nhập mật khẩu mới"
                            />
                            <InputItem
                                value={confirmNewPassword}
                                setValue={(e) => setConfirmNewPassword(e.target.value)}
                                type="password"
                                label="Xác nhận mật khẩu mới"
                            />
                            <div className="btn-change-password-container text-center">
                                <ButtonSubmit content="Lưu" loading={loading} />
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </Helmet>
    );
}

export default ChangePassword;
