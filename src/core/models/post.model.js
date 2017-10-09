export class Post {
    constructor(author, category, content, popularity, title) {
        this.author = author;
        this.category = category;
        this.title = title;
        this.popularity = 0;
        this.comments = [];
        this.tags = [];
    }

    get author() {
        return this._author;
    }
    get category() {
        return this._category;
    }
    get title() {
        return this._title;
    }


    set author(author) {
        this._author = author;
    }
    set category(category) {
        this._category = category;
    }
    set title(title) {
        this._title = title;
    }

    get passHash() {
        return this._passHash;
    }
}
