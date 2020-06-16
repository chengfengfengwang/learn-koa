const { db } = require('../core/db');
const { Sequelize, Model } = require('sequelize');
const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.INTEGER
}

class Movie extends Model {

}
Movie.init(classicFields, {
    sequelize: db,
    tableName: 'movie'
})

class Sentence extends Model {

}
Sentence.init(classicFields, {
    sequelize: db,
    tableName: 'sentence'
})

class Music extends Model {

}
const musicFields = Object.assign({ url: Sequelize.STRING }, classicFields);
Music.init(musicFields, {
    sequelize: db,
    tableName: 'music'
})
// setTimeout(() => {
//     Movie.create({
//         image: 'http://img.iguitar.immusician.com/17dff796e52745cb78a65daee27e17d3.png',
//         content: 'movie content 2',
//         pubdate: new Date(),
//         fav_nums: 3,
//         title: 'movie title 2',
//         type: 100
//     })
//     Movie.create({
//         image: 'http://img.iguitar.immusician.com/17dff796e52745cb78a65daee27e17d3.png',
//         content: 'movie content 3',
//         pubdate: new Date(),
//         fav_nums: 3,
//         title: 'movie title 3',
//         type: 100
//     })
//     Sentence.create({
//         image: 'http://img.iguitar.immusician.com/17dff796e52745cb78a65daee27e17d3.png',
//         content: 'Sentence content 2',
//         pubdate: new Date(),
//         fav_nums: 3,
//         title: 'Sentence title 2',
//         type: 200
//     })
//     Sentence.create({
//         image: 'http://img.iguitar.immusician.com/17dff796e52745cb78a65daee27e17d3.png',
//         content: 'Sentence content 3',
//         pubdate: new Date(),
//         fav_nums: 3,
//         title: 'Sentence title 3',
//         type: 200
//     })
//     Music.create({
//         image: 'http://img.iguitar.immusician.com/17dff796e52745cb78a65daee27e17d3.png',
//         url:'http://img.iguitar.immusician.com/17dff796e52745cb78a65daee27e17d3.png',
//         content: 'Music content 2',
//         pubdate: new Date(),
//         fav_nums: 3,
//         title: 'Music title 2',
//         type: 300
//     })
//     Music.create({
//         image: 'http://img.iguitar.immusician.com/17dff796e52745cb78a65daee27e17d3.png',
//         url:'http://img.iguitar.immusician.com/17dff796e52745cb78a65daee27e17d3.png',
//         content: 'Music content 3',
//         pubdate: new Date(),
//         fav_nums: 3,
//         title: 'Music title 3',
//         type: 300
//     })
// }, 1000);

module.exports = {
    Movie,
    Sentence,
    Music
}
