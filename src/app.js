import './styles/main.scss';
import 'bootstrap';
import './assets/favicon/favicon.ico';
import './assets/images/border-dashed.png';

import config from '../src/core/data/firebase';

import $ from 'jquery';

import Navigo from 'navigo';

// defined as chunks so each page is loaded separetley
const HomePage = () => System.import('./core/controllers/home').then(module => module.default());
const CategoryBasicsPage = () => System.import('./core/controllers/basics').then(module => module.default());
const CategoryTechniquesPage = () => System.import('./core/controllers/techniques').then(module => module.default());
const CategoryTrainingPage = () => System.import('./core/controllers/training').then(module => module.default());
const CategoryStrategyPage = () => System.import('./core/controllers/strategy').then(module => module.default());
const PostPage = () => System.import('./core/controllers/post').then(module => module.default());


const router = new Navigo();

router
    .on('/', HomePage)
    .on('/home', HomePage)
    .on('/basics', CategoryBasicsPage)
    .on('/techniques', CategoryTechniquesPage)
    .on('/training', CategoryTrainingPage)
    .on('/strategy', CategoryStrategyPage)
    .on('/post/:id', PostPage)
    .resolve();

$(window).on('load', () => {
    $(document).on('click', '[data-path]', (e) => {
        e.preventDefault();
        router.navigate($(e.target).attr('href'));
    });
});
