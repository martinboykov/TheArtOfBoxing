import $ from 'jquery'
import { compile } from 'handlebars'
import template from '../view/home.handlebars'

export default (ctx, next) => {
    let user = 'Martin';
    $('#app').html(compile(template)({
        user,
    }))
}
