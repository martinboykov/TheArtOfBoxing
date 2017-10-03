import $ from 'jquery';
import { compile } from 'handlebars';
import template from '../../view/about.handlebars';

export default (ctx, next) => {
    $('#app').html(compile(template)({

    }));
};
