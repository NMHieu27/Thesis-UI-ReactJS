import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Helmet from '~/components/Helmet/Helmet';
import teacherData from '~/fakedata/teacher';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import MultiSelectUser from '~/components/MultiSelectUser/MultiSelectUser';
import SelectMember from '../SelectMember';

function AddCouncil() {
    const [teachers, setTeachers] = useState();
    const [selectedChainman, setSelectedChainman] = useState(null);
    const [selectedSecretary, setSelectedSecretary] = useState(null);
    const [selectedAssessor, setSelectedAssessor] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState(null);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Call api get teacher following the major
        setTeachers(teacherData);
    }, []);

    // Call api add councill
    const addCouncil = (evt) => {
        evt.preventDefault();
        const param ={
            chainman: selectedChainman,
            secretary: selectedSecretary,
            assessor: selectedAssessor,
            members: selectedMembers,
        }
        console.log(param)
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
                                selected={selectedChainman}
                                setSelected={setSelectedChainman}
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
