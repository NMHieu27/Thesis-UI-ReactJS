import Helmet from '~/components/Helmet/Helmet';
import './PageUnauthorized.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useTranslation } from 'react-i18next';
function PageUnauthorized() {
    const {t} = useTranslation();
    return (
        <Helmet title="Không quyền truy cập">
            <div className="pageUnauthorized-wrapper">
                <div className="pageUnauthorized-container">
                    <div className="pageUnauthorized-image-container">
                        <div className="pageUnauthorized-image"></div>
                    </div>
                    <div className="pageUnauthorized-content-container">
                        <h1 className='txt-main-color'>Oops!</h1>
                        <h3>
                            {t('unauthorized-content')}
                        </h3>
                        <div className='btn-go-home-container text-center'>
                            <Link to={config.routes.home} className='btn-go'>{t('unauthorized-btn-go-home')}</Link>
                            <Link to={config.routes.singin} className='btn-go'>{t('unauthorized-btn-sign-in')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default PageUnauthorized;
