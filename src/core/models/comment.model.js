export class Comment {
    constructor(author, content, avatar) {
        this.author = author;
        this.content = content;
        this.avatar = "https://firebasestorage.googleapis.com/v0/b/thestyleofboxing.appspot.com/o/avatar_square_grey_512dp.png?alt=media&token=1e7c6fa7-a077-4dd0-9f46-1c39a2d400b3";
    }
    get author() {
        return this._author;
    }
    get content() {
        return this._content;
    }
    get avatar() {
        return this._avatar;
    }
    set author(author) {
        this._author = author;
    }
    set content(content) {
        this._content = content;
    }
    set avatar(avatar) {
        this._avatar = avatar;
    }
}
