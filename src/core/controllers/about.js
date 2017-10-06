import $ from 'jquery';
import { compile } from 'handlebars';
import template from '../../view/about.handlebars';

export default (ctx, next) => {
    $('#main').html(compile(template)({

    }));
};
