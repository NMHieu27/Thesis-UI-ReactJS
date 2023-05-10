import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import councilAPI from '~/api/councilAPI/councilAPI';
import criteriaAPI from '~/api/criteriaAPI/criteriaAPI';
import studentAPI from '~/api/studentAPI/studentAPI';
import teacherAPI from '~/api/teacherAPI/teacherAPI';
import thesisAPI from '~/api/thesisAPI/thesisAPI';
import ButtonSubmit from '~/components/Form/ButtonSubmit/ButtonSubmit';
import InputItem from '~/components/Form/InputItem/InputItem';
import Helmet from '~/components/Helmet/Helmet';
import MultiSelectUser from '~/components/MultiSelectUser/MultiSelectUser';
import councilData from '~/fakedata/council';
import { criteriaFormData } from '~/fakedata/criteriaForm';
import { studentsData } from '~/fakedata/students';
import teacherData from '~/fakedata/teacher';
import { thesesData } from '~/fakedata/theses';

function EditThesis() {
    const nav = useNavigate();
    const major = useSelector((state) => state.auth.user.major);
    const { thesisID } = useParams();
    const [thesis, setThesis] = useState(null);
    const [studentsFetch, setStudentsFetch] = useState(null);
    const [teachersFetch, setTeachersFetch] = useState(null);
    const [councilFetch, setCouncilFetch] = useState(null);
    const [criteriaFormFetch, setCriteriaFormFetch] = useState(null);
    const [name, setName] = useState();
    const [teachers, setTeachers] = useState(null);
    const [students, setStudents] = useState(null);
    const [criteriaForm, setCriteriaForm] = useState();
    const [council, setCouncil] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Call api get Thesis by id
        const fetchThesisByID = async () => {
            try {
                const res = await thesisAPI.getThesisByID(thesisID);
                setThesis(res.data);
            } catch {
                toast.error('Không thể lấy thông tin khóa luận');
            }
        };
        // setThesis(thesesData[thesisID - 1]);
        // Call api get students
        const fetchStudents = async () => {
            try {
                const res = await studentAPI.getStudentsByMajorID(major.id);
                setStudentsFetch(res.data);
            } catch {
                toast.error('Không thể lấy danh sách sinh viên');
            }
        };
        // setStudentsFetch(studentsData);
        // Call api get teachers
        const fetchTeachers = async () => {
            try {
                const res = await teacherAPI.getTeachersByMajorID(major.id);
                setTeachersFetch(res.data);
            } catch (error) {
                toast.error('Không thể lấy danh sách giảng viên');
            }
        };
        // setTeachersFetch(teacherData);
        // Call api get councils
        const fetchCouncils = async () => {
            try {
                const res = await councilAPI.getCouncilsByMajorID(major.id);
                setCouncilFetch(res.data.councils);
            } catch {
                toast.error('Không thể lấy danh sách hội đồng');
            }
        };
        // setCouncilFetch(councilData);
        // Call api get Criteria Form
        const fetchCriteriaForm = async () => {
            try {
                const res = await criteriaAPI.getCriterias();
                setCriteriaFormFetch(res.data);
            } catch (error) {
                toast.error('Không thể lấy danh sách tiêu chí');
            }
        };
        // setCriteriaFormFetch(criteriaFormData);
        fetchThesisByID();
        fetchStudents();
        fetchTeachers();
        fetchCouncils();
        fetchCriteriaForm();
    }, []);
    useEffect(() => {
        setName(thesis?.name);
        setStudents(thesis?.students);
        setTeachers(thesis?.teachers);
        setCouncil(thesis?.council);
        setCriteriaForm(thesis?.criteriaForm);
        setStatus(thesis?.status);
    }, [thesis]);

    console.log('council thesis:', thesis?.council);
    console.log('council list:', councilFetch);
    const editThesis = (evt) => {
        evt.preventDefault();
        const param = {
            name,
            students,
            teachers,
            council: council?.id,
            criteriaForm,
            major,
            status,
            // Lưu ý major lấy từ thông tin giáo vụ khoa
        };
        console.log(param);
    };
    return (
        <Helmet title="Thêm khóa luận">
            <div className="editThesis-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Thêm khóa luận khoa
                </h2>
                <div className="editThesis-container">
                    <Form onSubmit={editThesis}>
                        <InputItem
                            label="Tên khóa luận"
                            value={name}
                            controlId="thesisName"
                            type="text"
                            setValue={(e) => setName(e.target.value)}
                        />
                        <Form.Label>Sinh viên thực hiện</Form.Label>
                        {studentsFetch && students && (
                            <div className="card mb-3">
                                <MultiSelectUser
                                    data={studentsFetch}
                                    placeholder="Chọn tối đa 2 sinh viên"
                                    selected={students}
                                    setSelected={setStudents}
                                    maxSelected={2}
                                />
                            </div>
                        )}

                        <Form.Label>Giảng viên hướng dẫn</Form.Label>
                        {teachersFetch && teachers && (
                            <div className="card mb-3">
                                <MultiSelectUser
                                    data={teachersFetch}
                                    placeholder="Chọn tối đa 2 giảng viên"
                                    selected={teachers}
                                    setSelected={setTeachers}
                                    maxSelected={2}
                                />
                            </div>
                        )}

                        <Form.Label>Hội đồng chấm khóa luận</Form.Label>
                        {councilFetch && council && (
                            <div className="card mb-3">
                                <Dropdown
                                    value={council}
                                    onChange={(e) => setCouncil(e.target.value)}
                                    options={councilFetch}
                                    optionLabel="id"
                                    itemTemplate={(data) => `Hội đồng ${data?.id}`}
                                    valueTemplate={(data, props) => (data ? `Hội đồng ${data?.id}` : props.placeholder)}
                                    placeholder="Chọn hội đồng"
                                    filter
                                />
                            </div>
                        )}

                        <Form.Label>Tiêu chí chấm điểm</Form.Label>
                        {criteriaFormFetch && criteriaForm && (
                            <div className="card mb-3">
                                <Dropdown
                                    value={criteriaForm}
                                    onChange={(e) => setCriteriaForm(e.target.value)}
                                    options={criteriaFormFetch}
                                    optionLabel="name"
                                    placeholder="Chọn hội tiêu chí chấm điểm"
                                    filter
                                />
                            </div>
                        )}
                        <Form.Label>Trạng thái</Form.Label>
                        {status !== null  && (
                            <div className="card mb-3">
                                <Dropdown
                                    value={status}
                                    onChange={(e) => setStatus(e.value)}
                                    options={[0, 1]}
                                    placeholder="Chọn trạng thái"
                                    valueTemplate={(option) => (option === 0 ? 'Chưa chấm' : 'Đã chấm')}
                                    itemTemplate={(option) => (option === 0 ? 'Chưa chấm' : 'Đã chấm')}
                                    filter
                                />
                            </div>
                        )}

                        <div className="btn-signup-container text-center">
                            <ButtonSubmit content="Thêm" loading={loading} />
                        </div>
                    </Form>
                </div>
            </div>
        </Helmet>
    );
}

export default EditThesis;
