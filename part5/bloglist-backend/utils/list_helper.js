const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, cur) => sum + cur.likes, 0);
}

const favouriteBlog = (blogs) => {
    if (blogs.length == 0) return null;
    return blogs.reduce((max, blog) =>
        max.likes > blog.likes ? max :
            { author: blog.author, title: blog.title, likes: blog.likes },
        { likes: 0 });
}

const mostBlogs = (blogs) => {
    if (blogs.length == 0) return null;
    var authorBlogs =
        _(blogs)
            .groupBy('author')
            .map((blogs, author) => ({
                author,
                blogs: blogs.length
            })).value();
    return _.maxBy(authorBlogs, 'blogs');
}

const mostLikes = (blogs) => {
    if (blogs.length == 0) return null;
    var authorLikes =
        _(blogs)
            .groupBy('author')
            .map((blogs, author) => ({
                author,
                likes: blogs.reduce((sum, cur) => sum + cur.likes, 0)
            })).value();
    return _.maxBy(authorLikes, 'likes');
}


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}