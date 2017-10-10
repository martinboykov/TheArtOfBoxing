import $ from 'jquery';
import { compile } from 'handlebars';
import template from '../../view/category.handlebars';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

export default () => {
    const db = firebase.database().ref();
    const events = db.child('Posts');
    const query = events
        .orderByChild('category')
        .equalTo('strategy')
        .limitToFirst(12);

    query.on("value", snap => {
        const category = 'Strategy';
        const posts = (snap.val());
        console.log(posts);
        $('#app').html(compile(template)({
            posts,
            category
        }));
    });
};
