import './styles/main.scss';
import 'bootstrap';
import './assets/favicon/favicon.ico';
import config from '../src/core/data/firebase';

import $ from 'jquery';

import Navigo from 'navigo';

// defined as chunks so each page is loaded separetley
const HomePage = () => System.import('./core/controllers/home').then(module => module.default());
const AboutPage = () => System.import('./core/controllers/about').then(module => module.default());


const router = new Navigo();

router
    .on('/', HomePage)
    .on('/home', HomePage)
    .on('/about', AboutPage)
    .resolve();

$(window).on('load', () => {
    $(document).on('click', '[data-path]', (e) => {
        e.preventDefault();
        router.navigate($(e.target).attr('href'));
    });
});
