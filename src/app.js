import './styles/main.scss'

import $ from 'jquery'

import Navigo from 'navigo'

// defined as chunks so each page is loaded separetley
const HomePage = () => System.import('./js/home').then(module => module.default());
const AboutPage = () => System.import('./js/about').then(module => module.default());

const router = new Navigo()

router
    .on('/', HomePage)
    .on('/home', HomePage)
    .on('/about', AboutPage)
    .resolve()

$(window).on('load', () => {
    $(document).on('click', '[data-path]', (e) => {
        e.preventDefault()
        router.navigate($(e.target).attr('href'))
    })
})
