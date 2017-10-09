import $ from 'jquery';
import { compile } from 'handlebars';
import template from '../../view/post.handlebars';
import '../../assets/images/big-border-top.png';
import '../../assets/images/medium-border-top-article.png';
import '../../assets/images/medium-border-top-aside.png';
import '../../assets/images/medium-border-bottom-comments.png';
import '../../assets/images/small-border-right-aside.png';
import '../../assets/icons/delicious-icon.png';
import '../../assets/icons/digg-icon.png';
import '../../assets/icons/facebook-icon.png';
import '../../assets/icons/reddit-icon.png';
import '../../assets/icons/twitter-icon.png';
import '../../assets/images/right-main-section-bottom.png';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

export default (ctx, next) => {
    const db = firebase.database().ref("techniques/100001");

    db.on("value", snap => {
        const post = (snap.val());
        const category = post.category;
        console.log(post);
        $('#app').html(compile(template)({
            post, category
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
