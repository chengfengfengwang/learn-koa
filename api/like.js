const { Favor } = require('../models/favor');
const { Art } = require('../models/art');

const { LikeValidator, FavorDetailValidator } = require('../validators/validators.js');
const { Auth } = require('../middleware/auth');

const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/like'
});


router.post('/', new Auth().m, async (ctx, next) => {
    const body = ctx.request.body;
    const v = await new LikeValidator().validate(ctx);
    await Favor.like(body.art_id, body.type, ctx.auth.uid)
    throw new global.errors.Success()
})
router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
    const id = parseInt(ctx.params.id);
    const type = parseInt(ctx.params.type);
    const v = await new FavorDetailValidator().validate(ctx);
    const art = await Art.getData(id, type);
    const isLike = await Favor.userlike(id, type, ctx.auth.uid);
    ctx.body = {
        fav_nums: art.fav_nums,
        is_like: isLike
    }
})
module.exports = router