import './styles/main.scss'

import $ from 'jquery'

import Navigo from 'navigo'

import HomePage from './js/home'
import AboutPage from './js/about'

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
