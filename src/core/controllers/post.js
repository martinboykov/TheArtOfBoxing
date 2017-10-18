import $ from 'jquery';
import {
    compile
} from 'handlebars';
import template from '../../view/post.handlebars';
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
    db.on("value", snap => {
        const post = (snap.val());
        const category = post.category;
        const title = post.title;
        const comments = post.comments;
        // const commentsAll = post.comments;
        // console.log(commentsAll.length);
        // let comments = [];
        // console.log(comments);
        // if (commentsAll.length !== 0) {
        //     console.log(commentsAll.length);
        //     let comments = commentsAll.slice(commentsAll.length - 4, commentsAll.length);
        // }



        console.log(comments);
        $('#app').html(compile(template)({
            post,
            category,
            title,
            comments,
            id
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
    });
    //Entire Form (handler)
    $('#newComment').submit(function (event) {

        const $form = $(this);
        console.log("Submit to Firebase");

        //disable submit button
        $form.find("#saveForm").prop('disabled', true);

        //get values to send to Firebase
        const author = $('#author').val();
        const content = $('#content').val();
        const timestamp = firebase.database.ServerValue.TIMESTAMP;
        const month = moment().format("MMM");
        const day = moment().format("DD");
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
            })
            .then(() => {
                post(id);
            })

        return false;
    });
}


export {
    post,
    comment
};
