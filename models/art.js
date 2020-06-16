const { Movie } = require('./classic');
const { Sentence } = require('./classic');
const { Music } = require('./classic');

class Art {
    static async getData(art_id, type) {
        const finder = { id: art_id }
        switch (type) {
            case 100:
                return await Movie.findOne({
                    where: finder
                })
                break;
            case 200:
                return await Sentence.findOne({
                    where: finder
                })
                break;
            case 300:
                return await Music.findOne({
                    where: finder
                })
                break;
        };

    }
}
module.exports = { Art }