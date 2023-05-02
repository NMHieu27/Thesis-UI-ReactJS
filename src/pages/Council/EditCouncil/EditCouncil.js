import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Helmet from '~/components/Helmet/Helmet';
import teacherData from '~/fakedata/teacher';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import MultiSelectUser from '~/components/MultiSelectUser/MultiSelectUser';
import SelectMember from '../SelectMember';
import { useParams } from 'react-router-dom';
import councilData from '~/fakedata/council';
import { Dropdown } from 'primereact/dropdown';

function EditCouncil() {
    const { councilID } = useParams();
    const [teachers, setTeachers] = useState();
    const [council, setCouncil] = useState();
    const [selectedChainman, setSelectedChainman] = useState(null);
    const [selectedSecretary, setSelectedSecretary] = useState(null);
    const [selectedAssessor, setSelectedAssessor] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState(null);
    const [status, setStatus] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Call api get council by id
        setCouncil(councilData[councilID - 1]);
        // Call api get teacher following major
        setTeachers(teacherData);
    }, []);
    useEffect(() => {
        setSelectedChainman(council?.chainman);
        setSelectedSecretary(council?.secretary);
        setSelectedAssessor(council?.assessor);
        setSelectedMembers(council?.members)
        setStatus(council?.status);
    }, [council]);

    // Call api add councill
    const editCouncil = (evt) => {
        evt.preventDefault();
        const param = {
            chainman: selectedChainman,
            secretary: selectedSecretary,
            assessor: selectedAssessor,
            members: selectedMembers,
            status:status,
        };
        console.log(param);
        // setLoading(true);
    };
    return (
        <Helmet title="Thêm hội đồng">
            <div className="editCouncil-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Chỉnh sửa hội đồng
                </h2>
                <div className="editCouncil-container">
                    <Form onSubmit={editCouncil}>
                        <Form.Label>Chủ tịch hội đồng</Form.Label>
                        <div className="card mb-3">
                            {selectedChainman && <SelectMember
                                data={teachers}
                                selected={selectedChainman}
                                setSelected={setSelectedChainman}
                                placeholder={'Chọn chủ tịch hội đồng'}
                            />}
                        </div>
                        <Form.Label>Thư ký hội đồng</Form.Label>
                        <div className="card mb-3">
                            {selectedSecretary && <SelectMember
                                data={teachers}
                                selected={selectedSecretary}
                                setSelected={setSelectedSecretary}
                                placeholder={'Chọn thư ký hội đồng'}
                            />}
                        </div>
                        <Form.Label>Giảng viên phản biện</Form.Label>
                        <div className="card mb-3">
                            {selectedAssessor && <SelectMember
                                data={teachers}
                                selected={selectedAssessor}
                                setSelected={setSelectedAssessor}
                                placeholder={'Chọn giảng viên phản biện'}
                            />}
                        </div>
                        <Form.Label>Các thành viên khác (Tối đa 2 thành viên)</Form.Label>
                        <div className="card mb-3">
                            {selectedMembers && (
                                <MultiSelectUser
                                    data={teachers}
                                    selected={selectedMembers}
                                    setSelected={setSelectedMembers}
                                    placeholder={'Chọn các thành viên khác'}
                                    maxSelected={2}
                                />
                            )}
                        </div>
                        <Form.Label>Trạng thái</Form.Label>
                                <div className="card mb-3">
                                    <Dropdown
                                        value={status}
                                        onChange={(e) => setStatus(e.value)}
                                        options={[0, 1]}
                                        placeholder="Chọn trạng thái"
                                        valueTemplate={(option) => (option === 0 ? 'Đóng' : 'Mở')}
                                        itemTemplate={(option) => (option === 0 ? 'Đóng' : 'Mở')}
                                        filter
                                    />
                                </div>
                        <div className="btn-editCouncil-container text-center">
                            <ButtonSubmit content="Lưu" loading={loading} />
                        </div>
                    </Form>
                </div>
            </div>
        </Helmet>
    );
}

export default EditCouncil;
