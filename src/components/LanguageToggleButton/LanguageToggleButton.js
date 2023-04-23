import './LanguageToggleButton.scss';
function LanguageToggleButton() {
    
    return (
        <div className="switch">
            <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" />
            <label htmlFor="language-toggle" />
            <span className="on">VI</span>
            <span className="off">EN</span>
        </div>
    );
}

export default LanguageToggleButton;
