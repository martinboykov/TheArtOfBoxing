import $ from 'jquery';
import { compile } from 'handlebars';
import template from '../../view/category.handlebars';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

export default (ctx, next) => {
    const db = firebase.database().ref("basics");

    db.on("value", snap => {
        const basics = (snap.val());
        const category = "Basics";
        console.log(basics);
        $('#app').html(compile(template)({
            basics, category
        }));
    });
    // Promise.all([
    //         dateService.getBooks(),
    //         template
    //     ])
    //     .then(([books, template]) => {
    //         $('#app').html(compile(template)({
    //             user,
    //             books
    //         }))
    //     });

};
