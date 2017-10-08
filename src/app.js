import './styles/main.scss';
import 'bootstrap';
import './assets/favicon/favicon.ico';
import './assets/images/border-dashed.png';
import config from '../src/core/data/firebase';

import $ from 'jquery';

import Navigo from 'navigo';

// defined as chunks so each page is loaded separetley
const HomePage = () => System.import('./core/controllers/home').then(module => module.default());
const CategoryPage = () => System.import('./core/controllers/basics').then(module => module.default());
const PostPage = () => System.import('./core/controllers/post').then(module => module.default());


const router = new Navigo();

router
    .on('/', HomePage)
    .on('/home', HomePage)
    .on('/basics', CategoryPage)
    .on('/post', PostPage)
    .resolve();

$(window).on('load', () => {
    $(document).on('click', '[data-path]', (e) => {
        e.preventDefault();
        router.navigate($(e.target).attr('href'));
    });
});
