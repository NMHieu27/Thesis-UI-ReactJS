import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import Image from '../Image/Image';

function ThesisCard({ data, type }) {
    let url = `/teacher/danh-sach-khoa-luan-cham-diem/khoa-luan/${data.id}`;
    if (type === 'studentThesis') url = `/student/danh-sach-khoa-luan/khoa-luan/${data.id}`;
    const cardImg = [
        images.cardPic1,
        images.cardPic2,
        images.cardPic3,
        images.cardPic4,
        images.cardPic5,
        images.cardPic6,
    ];
    return (
        <Col md={3} xs={12} key={data.id} className="p-2">
            <Card>
                <Card.Img variant="top" src={cardImg[Math.floor(Math.random() * cardImg.length)]} />
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    {type === 'studentThesis' ? (
                        <>
                        <p style={{fontWeight:'bold'}}>Trạng thái: <span className={data.status === 0 ? 'text-danger' : 'text-success'}>{data.status === 0 ? 'Chưa chấm' : 'Đã chấm'}</span></p>
                            <div className="text-end">
                                <Link to={url} className="btn" style={{background:'var(--main-bg-color)', color:'white'}}>
                                    Xem chi tiết
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                        <p style={{ color: 'var(--main-bg-color)', fontWeight: 'bold' }}>Trạng thái: <span className={data.mark_status === 0 ? 'text-danger' : data.mark_status === 1? 'text-secondary':'text-success'}>{data.mark_status === 0 ? 'Chưa chấm' : data.mark_status === 1? 'Đang chấm':'Đã chấm'}</span></p>
                            <span style={{ color: 'var(--main-bg-color)', fontWeight: 'bold' }}>Sinh viên:</span>
                            {data.students.map((member, index) => (
                                <div key={index} className="d-flex align-items-center m-4">
                                    <Image
                                        src={member.avatar}
                                        alt={member.last_name + ' ' + member.first_name}
                                        style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 8 }}
                                    />
                                    <p style={{ marginBottom: '0' }}>{member.last_name + ' ' + member.first_name}</p>
                                </div>
                            ))}
                            <div className="text-end">
                                <Link to={url} className="btn" style={{background:'var(--main-bg-color)', color:'white'}}>
                                    Chấm điểm
                                </Link>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ThesisCard;
