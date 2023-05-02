import './Home.scss';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Helmet from '~/components/Helmet/Helmet';
function Home() {
    const { t } = useTranslation();
    return (
        <Helmet title="Trang chủ">
            <div className="home-wrapper">
                <div className="home-intro">
                    <div className="home-intro-text-wrapper">
                        <div className="home-intro-text-container">
                            <div className="intro-text-title delay-01">{t('homepage-intro-title')}</div>
                            <p className="intro-text-content delay-02">
                                {t('homepage-intro-content')}
                            </p>
                            <div className='btn-intro-detail-container'><button className="btn-intro-detail delay-03">{t('homepage-intro-detail')}</button></div>
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
