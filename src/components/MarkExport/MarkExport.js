import { Col, Row, Table } from 'react-bootstrap';
import './MarkExport.scss';
function MarkExport({ thesisData, markData, idWrapper }) {
    return (
        <div className={`mark-export-wrapper mark-export-${idWrapper} `}>
            <div className="mark-export-container">
                <div className="mark-export-header">
                    <p>TRƯỜNG ĐẠI HỌC MỞ TPHCM</p>
                    <p>KHOA {thesisData?.major?.name}</p>
                </div>
                <p className="text-center">PHIẾU ĐIỂM TỔNG HỢP KHÓA LUẬN TỐT NGHIỆP</p>
                <p>Sinh viên thực hiện: </p>
                {thesisData?.students.map((s) => (
                    <Row>
                        <Col xl={6} xs={6}>
                            Tên sinh viên: {s.last_name + ' ' + s.first_name}
                        </Col>
                        <Col xl={6} xs={6}>
                            MSSV: {s.id}
                        </Col>
                    </Row>
                ))}
                <p>Tên đề tài: {thesisData?.name}</p>
                <p>Giảng viên hướng dẫn:</p>
                {thesisData?.teachers.map((t) => (
                    <Row>
                        <Col xl={6} xs={6}>
                            Tên giảng viên: {t.last_name + ' ' + t.first_name}
                        </Col>
                    </Row>
                ))}
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            {markData?.criteriaDetail.map((u, index) => (
                                <th key={index}>Tiêu chí {index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {markData?.users.map((u, index) => (
                            <tr key={index}>
                                <td>{u.name}</td>
                                {u?.mark?.map((u, index) => (
                                    <td key={index}>{u}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên tiêu chí</th>
                            <th>Trọng số</th>
                        </tr>
                    </thead>
                    <tbody>
                        {markData?.criteriaDetail?.map((u, index) => (
                            <tr key={index}>
                                <td>Tiêu chí {index + 1}</td>
                                <td>
                                    <p
                                        className="criteria-detail-container"
                                        dangerouslySetInnerHTML={{ __html: u.description }}
                                    ></p>
                                </td>
                                <td>{` ${(u.percent * 100).toFixed(0) + '%'}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default MarkExport;
