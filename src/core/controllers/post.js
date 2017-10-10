import $ from 'jquery';
import {
    compile
} from 'handlebars';
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
import {
    Comment
} from '../models/comment.model';
import moment from 'moment';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/database';

function post(id) {

    const db = firebase.database().ref(`Posts/${id}`);

    return db.on("value", snap => {
        const post = (snap.val());
        const category = post.category;
        const title = post.title;

        console.log(post.id);
        $('#app').html(compile(template)({
            post,
            category,
            title

        }));
    });

}

function comment(id) {
    //make a variable to keep track of data coming from firebase
    let data = [];

    //create new connection to firebase
    const db = firebase.database().ref(`Posts/${id}/comments`);


    //listen to data updates from firebase
    db.on("value", function (snapshot) {
        console.log(snapshot.val());
        //when the data updates at firebase, put it in the data variable
        data = snapshot.val();
    })
    //Entire Form (handler)
    $('#newComment').submit(function (event) {

        const $form = $(this);
        console.log("Submit to Firebase");

        //disable submit button
        $form.find("#saveForm").prop('disabled', true);

        //get values to send to Firebase
        const author = $('#author').val();
        console.log(author);

        const content = $('#content').val();
        console.log(content);
        const timestamp = firebase.database.ServerValue.TIMESTAMP;
        console.log(timestamp);
        var month = moment().format("MMM");
        var day = moment().format("DD");
        console.log(month);
        console.log(day);

        //take the values from the form, and put them in an object
        let newComment = new Comment(author, content, day, month);



        //put new object in data array
        data.push(newComment);
        console.log(data);

        //send the new data to Firebase
        db.set(data, function (err) {
            if (err) {
                alert("Data no go");
            }
        });

        return false;
    });
};


export {
    post,
    comment
};
