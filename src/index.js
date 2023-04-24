import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './components/GlobalStyles/GlobalStyles';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStyle>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </GlobalStyle>,
);

// Language
i18n.use(initReactI18next).init({
    lng: localStorage.getItem('languages') || 'vi',
    fallbackLng: 'vi',
    debug: true,
    resources: {
        en: {
            translation: require('./languages/en.json'),
        },
        vi: {
            translation: require('./languages/vi.json'),
        },
    },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
