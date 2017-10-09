import $ from 'jquery';
import { compile } from 'handlebars';
import template from '../../view/home.handlebars';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

export default () => {
    const db = firebase.database().ref();
    const events = db.child('Posts');
    const query = events
        .orderByChild('category')
        .limitToLast(12);

    query.on("value", snap => {
        const posts = (snap.val());
        console.log(posts);
        $('#app').html(compile(template)({
            posts
        }));
    });
};
