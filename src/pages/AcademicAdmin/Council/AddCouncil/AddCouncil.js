import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Helmet from '~/components/Helmet/Helmet';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import MultiSelectUser from '~/components/MultiSelectUser/MultiSelectUser';
import SelectMember from '../SelectMember';
import teacherAPI from '~/api/teacherAPI/teacherAPI';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import councilAPI from '~/api/councilAPI/councilAPI';
import { useNavigate } from 'react-router-dom';

function AddCouncil() {
    const major = useSelector((state) => state.auth.user.major);
    const [teachers, setTeachers] = useState();
    const [selectedChairman, setSelectedChairman] = useState(null);
    const [selectedSecretary, setSelectedSecretary] = useState(null);
    const [selectedAssessor, setSelectedAssessor] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const nav = useNavigate();

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Call api get teacher following the major
        const fetchTeachers = async () => {
            try {
                const res = await teacherAPI.getTeachersByMajorID(major.id);
                setTeachers(res.data);
            } catch (error) {
                toast.error('Không thể lấy danh sách giảng viên');
            }
        };
        // setTeachers(teacherData);
        fetchTeachers();
    }, []);

    // Call api add councill
    const addCouncil = (evt) => {
        evt.preventDefault();
        const param = {
            chairman: selectedChairman,
            secretary: selectedSecretary,
            assessor: selectedAssessor,
            members:selectedMembers,
            major: major,
        };

        console.log(JSON.stringify(param));
        const createCouncil = async () => {
            try {
                const res = await councilAPI.createCouncil(JSON.stringify(param));
                console.log(res.data);
                toast.success('Tạo hội đồng thành công!')
                nav(-1);
            } catch {
                toast.error('Có lỗi xảy ra! Không thể tạo hội đồng');
            }
        };
        createCouncil();
        // setLoading(true);
    };
    return (
        <Helmet title="Thêm hội đồng">
            <div className="addCouncil-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Thêm hội đồng
                </h2>
                <div className="addCouncil-container">
                    <Form onSubmit={addCouncil}>
                        <Form.Label>Chủ tịch hội đồng</Form.Label>
                        <div className="card mb-3">
                            <SelectMember
                                data={teachers}
                                selected={selectedChairman}
                                setSelected={setSelectedChairman}
                                placeholder={'Chọn chủ tịch hội đồng'}
                            />
                        </div>
                        <Form.Label>Thư ký hội đồng</Form.Label>
                        <div className="card mb-3">
                            <SelectMember
                                data={teachers}
                                selected={selectedSecretary}
                                setSelected={setSelectedSecretary}
                                placeholder={'Chọn thư ký hội đồng'}
                            />
                        </div>
                        <Form.Label>Giảng viên phản biện</Form.Label>
                        <div className="card mb-3">
                            <SelectMember
                                data={teachers}
                                selected={selectedAssessor}
                                setSelected={setSelectedAssessor}
                                placeholder={'Chọn giảng viên phản biện'}
                            />
                        </div>
                        <Form.Label>Các thành viên khác (Tối đa 2 thành viên)</Form.Label>
                        <div className="card mb-3">
                            <MultiSelectUser
                                data={teachers}
                                selected={selectedMembers}
                                setSelected={setSelectedMembers}
                                placeholder={'Chọn các thành viên khác'}
                                maxSelected={2}
                            />
                        </div>
                        <div className="btn-addCouncil-container text-center">
                            <ButtonSubmit content="Thêm" loading={loading} />
                        </div>
                    </Form>
                </div>
            </div>
        </Helmet>
    );
}

export default AddCouncil;
