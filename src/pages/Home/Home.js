import Helmet from '~/components/Helmet/Helmet';
import './Home.scss';
import { Button } from 'react-bootstrap';
function Home() {
    return (
        <Helmet title="Trang chủ">
            <div className="home-wrapper">
                <div className="home-intro">
                    <div className="home-intro-text-wrapper">
                        <div className="home-intro-text-container">
                            <div className="intro-text-title delay-02">Hệ thống quản lí khóa luận tốt nghiệp</div>
                            <p className="intro-text-content delay-04">
                                Chào mừng bạn đến với trang web quản lí khóa luận tốt nghiệp! Chúng tôi cung cấp một nền
                                tảng trực tuyến hoàn chỉnh để giúp sinh viên, giảng viên và cố vấn khóa luận tốt nghiệp
                                quản lí, theo dõi và đánh giá tiến độ và kết quả của khóa luận tốt nghiệp.
                            </p>
                            <div className='btn-intro-detail-container'><Button className="btn-intro-detail delay-06">Tìm hiểu thêm →</Button></div>
                        </div>
                    </div>
                    <div className="home-intro-image">
                        <img
                            src="https://res.cloudinary.com/ddphodfop/image/upload/v1682240577/3081642_no2vte.jpg"
                            alt="err"
                        />
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Home;
