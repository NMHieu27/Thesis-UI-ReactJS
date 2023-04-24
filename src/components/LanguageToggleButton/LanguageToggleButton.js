import { useTranslation } from 'react-i18next';
import './LanguageToggleButton.scss';
import { useState } from 'react';
function LanguageToggleButton() {
    const { i18n } = useTranslation();
    const [checked, setChecked] = useState(localStorage.getItem('languages') === 'en' ? true : false);
    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.checked ? 'en' : 'vi');
        localStorage.setItem("languages", i18n.language);
        console.log(i18n.language);
        console.log(event.target.checked);
        setChecked(!checked);
    };
    return (
        <div className="switch">
            <input
                id="language-toggle"
                className="check-toggle check-toggle-round-flat"
                checked={checked}
                type="checkbox"
                onChange={changeLanguage}
            />
            <label htmlFor="language-toggle" />
            <span className="on">VI</span>
            <span className="off">EN</span>
        </div>
    );
}

export default LanguageToggleButton;
