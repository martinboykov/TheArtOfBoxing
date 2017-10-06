import $ from 'jquery';
import { compile } from 'handlebars';
import template from '../../view/home.handlebars';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

export default (ctx, next) => {
    const db = firebase.database().ref("techniques");

    db.on("value", snap => {
        const techniques = (snap.val());
        console.log(techniques);
        $('#app').html(compile(template)({
            techniques
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
