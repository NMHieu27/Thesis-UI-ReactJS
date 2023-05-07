import { useEffect, useState } from 'react';
import './MyThesisDetail.scss';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import Info from '~/components/Info/Info';
import { myThesisDetailData } from '~/fakedata/myThesisDetail';

function MyThesisDetail() {
    const { thesisID } = useParams();
    const [myThesisDetail, setMyThesisDetail] = useState();
    useEffect(() => {
        // Call api get thesis detail by thesis ID
        setMyThesisDetail(myThesisDetailData[thesisID - 1]);
    }, []);
    return (
        <Helmet title="Chi tiết khóa luận">
            <div className="my-thesis-detail-wrapper">
                <h2 className="text-center m-4" style={{ color: '#0841c3' }}>
                    Thông tin khóa luận
                </h2>
                {myThesisDetail && (
                    <div className="my-thesis-detail-container">
                        <Row>
                            <Col xl={6} xs={12} className="card p-4">
                                <p>
                                    <span className="my-thesis-label">Mã khóa luận: </span>
                                    <span>{myThesisDetail.id}</span>
                                </p>
                                <p>
                                    <span className="my-thesis-label">Tên khóa luận: </span>
                                    <span>{myThesisDetail.name}</span>
                                </p>
                                <p>
                                    <span className="my-thesis-label">Khoa: </span>
                                    <span>{myThesisDetail.major.name}</span>
                                </p>
                                <p>
                                    <span className="my-thesis-label">Trạng thái: </span>
                                    <span className={myThesisDetail.status === 0 ? 'text-danger' : 'text-success'}>
                                        {myThesisDetail.status === 0 ? 'Chưa chấm' : 'Đã chấm'}
                                    </span>
                                </p>
                                <p>
                                    <span className="my-thesis-label">Điểm số: </span>
                                    <span className={myThesisDetail.mark === null ? 'text-danger' : 'text-success'}>
                                        {myThesisDetail.mark === null ? 'Chưa chấm' : myThesisDetail.mark}
                                    </span>
                                </p>
                                <p>
                                    <span className="my-thesis-label">Ngày đăng kí: </span>
                                    <span>{myThesisDetail.created_date}</span>
                                </p>
                                <p>
                                    <span className="my-thesis-label">Sinh viên: </span>
                                </p>
                                <div className="my-thesis-members m-4">
                                    {myThesisDetail.students.map((member, index) => (
                                        <Info data={member} key={index} />
                                    ))}
                                </div>
                                <p>
                                    <span className="my-thesis-label">Giáo viên hướng dẫn: </span>
                                </p>
                                <div className="my-thesis-members m-4">
                                    {myThesisDetail.teachers.map((member, index) => (
                                        <Info data={member} key={index} />
                                    ))}
                                </div>
                            </Col>
                            <Col xl={6} xs={12} className="card p-4">
                                <div className="my-thesis-council-container">
                                    <p>
                                        <span className="my-thesis-label">Hội đồng: </span>
                                        <span>{myThesisDetail.council.id}</span>
                                    </p>
                                    <div className="m-4">
                                        <p>
                                            <span className="my-thesis-label">Chủ tịch hội đồng </span>
                                        </p>
                                        <div className="m-4">
                                            <Info data={myThesisDetail.council.chairman} />
                                        </div>
                                        <p>
                                            <span className="my-thesis-label">Thư kí </span>
                                        </p>
                                        <div className="m-4">
                                            <Info data={myThesisDetail.council.secretary} />
                                        </div>
                                        <p>
                                            <span className="my-thesis-label">Giảng viên phản biện </span>
                                        </p>
                                        <div className="m-4">
                                            <Info data={myThesisDetail.council.assessor} />
                                        </div>
                                        {myThesisDetail.council.members && (
                                            <>
                                                <p>
                                                    <span className="my-thesis-label">Các thành viên khác</span>
                                                </p>
                                                <div className="m-4">
                                                    {myThesisDetail.council.members.map((mem, index) => (
                                                        <Info data={mem} key={index} />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className>
                            <Col className="card p-4">
                                <p>
                                    <span className="my-thesis-label">Tiêu chí chấm điểm:</span>
                                    <span>{myThesisDetail.criteriaForm.name}</span>
                                </p>
                                {myThesisDetail.criteriaForm.criteria.map((c, index) => (
                                    <p className="m-2" key={index}>
                                        <span className="my-thesis-label">{`Tiêu chí ${index + 1}: `}</span>
                                        <span>{`${c.name} (${(c.percent * 100).toFixed(0) + '%'})`}</span>
                                    </p>
                                ))}
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        </Helmet>
    );
}

export default MyThesisDetail;
