import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

function ThesisCard({ data, type }) {
    let url = `/teacher/danh-sach-khoa-luan-cham-diem/khoa-luan/${data.id}`;
    if (type === 'studentThesis') url = `/student/danh-sach-khoa-luan/khoa-luan/${data.id}`;
    const cardImg = [
        images.cardPic1,
        images.cardPic2,
        images.cardPic3,
        images.cardPic4,
        images.cardPic5,
        images.cardPic6
    ];
    return (
        <Col md={3} xs={12} key={data.id} className="p-2">
            <Card>
                <Card.Img variant="top" src={cardImg[Math.floor(Math.random() * cardImg.length)]} />
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    {type === 'studentThesis' ? (
                        <Link to={url} className="btn">
                            Xem chi tiết
                        </Link>
                    ) : (
                        <Link to={url} className="btn">
                            Chấm điểm
                        </Link>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ThesisCard;
