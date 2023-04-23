import './Footer.scss';
function Footer() {
    return (
        <footer className="new_footer_area bg_color">
            <div className="new_footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="f_widget company_widget wow fadeInLeft"
                                data-wow-delay="0.2s"
                                style={{
                                    visibility: 'visible',
                                    animationDelay: '0.2s',
                                    animationName: 'fadeInLeft',
                                }}
                            >
                                <h3 className="f-title f_600 t_color f_size_18">Get in Touch</h3>
                                <p>Don’t miss any updates of our new templates and extensions.!</p>
                                <form
                                    action="#a"
                                    className="f_subscribe_two mailchimp"
                                    method="post"
                                    noValidate="true"
                                    _lpchecked={1}
                                >
                                    <input
                                        type="text"
                                        name="EMAIL"
                                        className="form-control memail"
                                        placeholder="Email"
                                    />
                                    <button className="btn btn_get btn_get_two" type="submit">
                                        Subscribe
                                    </button>
                                    <p className="mchimp-errmessage" style={{ display: 'none' }} />
                                    <p className="mchimp-sucmessage" style={{ display: 'none' }} />
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="f_widget about-widget pl_70 wow fadeInLeft"
                                data-wow-delay="0.4s"
                                style={{
                                    visibility: 'visible',
                                    animationDelay: '0.4s',
                                    animationName: 'fadeInLeft',
                                }}
                            >
                                <h3 className="f-title f_600 t_color f_size_18">Download</h3>
                                <ul className="list-unstyled f_list">
                                    <li>
                                        <a href="#ay">Company</a>
                                    </li>
                                    <li>
                                        <a href="#a">Android App</a>
                                    </li>
                                    <li>
                                        <a href="#a">Ios App</a>
                                    </li>
                                    <li>
                                        <a href="#a">Desktop</a>
                                    </li>
                                    <li>
                                        <a href="#a">Projects</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="f_widget about-widget pl_70 wow fadeInLeft"
                                data-wow-delay="0.6s"
                                style={{
                                    visibility: 'visible',
                                    animationDelay: '0.6s',
                                    animationName: 'fadeInLeft',
                                }}
                            >
                                <h3 className="f-title f_600 t_color f_size_18">Help</h3>
                                <ul className="list-unstyled f_list">
                                    <li>
                                        <a href="#a">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="#a">Term &amp; conditions</a>
                                    </li>
                                    <li>
                                        <a href="#a">Reporting</a>
                                    </li>
                                    <li>
                                        <a href="#a">Documentation</a>
                                    </li>
                                    <li>
                                        <a href="#a">Support Policy</a>
                                    </li>
                                    <li>
                                        <a href="#a">Privacy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div
                                className="f_widget social-widget pl_70 wow fadeInLeft"
                                data-wow-delay="0.8s"
                                style={{
                                    visibility: 'visible',
                                    animationDelay: '0.8s',
                                    animationName: 'fadeInLeft',
                                }}
                            >
                                <h3 className="f-title f_600 t_color f_size_18">Team Solutions</h3>
                                <div className="f_social_icon">
                                    <a href="#a" className="fab fa-facebook" />
                                    <a href="#a" className="fab fa-twitter" />
                                    <a href="#a" className="fab fa-linkedin" />
                                    <a href="#a" className="fab fa-pinterest" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bg">
                    <div className="footer_bg_one" />
                    <div className="footer_bg_two" />
                    <div className="footer_bg_three" />
                    <div className="footer_bg_four" />
                    <div className="footer_bg_five" />
                    <div className="footer_bg_six" />
                </div>
            </div>
            <div className="footer_bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-sm-7">
                            <p className="mb-0 f_400">© Pineapple All rights reserved.</p>
                        </div>
                        <div className="col-lg-6 col-sm-5 text-right">
                            <p>
                                Made with ❤️ in Hieu
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
