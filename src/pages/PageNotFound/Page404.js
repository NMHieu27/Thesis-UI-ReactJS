import Helmet from '~/components/Helmet/Helmet';
import './Page404.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useTranslation } from 'react-i18next';
function Page404() {
    const {t} = useTranslation();
    return (
        <Helmet title="Page không tìm thấy">
            <div className="page404-wrapper">
                <div className="page404-container">
                    <div className="page404-image-container">
                        <div className="page404-image"></div>
                    </div>
                    <div className="page404-content-container">
                        <h1 className='txt-main-color'>Oops!</h1>
                        <h3>
                            {t('404-content')}
                        </h3>
                        <div className='btn-go-home-container text-center'>
                            <Link to={config.routes.home} className='btn-go-home'>{t('404-btn')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Page404;
