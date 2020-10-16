import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';

function Landing() {
    const { t, } = useTranslation('landing');
    return (
        <div id="page-landing">
            <div className="content-wrapper">

                <img src={logoImg} alt="Happy" />

                <main>
                    <h1>{t('title')}</h1>
                    <p>{t('subtitle')}</p>
                </main>

                <div className="location">
                    <strong>Osasco</strong>
                    <span>S&atilde;o Paulo</span>
                </div>

                <Link to="/map" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    );
}

export default Landing;
