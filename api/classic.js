const { Flow } = require('../models/flow');
const { Art } = require('../models/art');

const { Success, ParameterException } = require('../core/http-exception');
const { TokenValidator } = require('../validators/validators.js');
const { Auth } = require('../middleware/auth');

const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/classic'
});

router.get('/', new Auth(3).m, async (ctx, next) => {
    const body = ctx.request.body;
    ctx.body = {
        uid: ctx.auth.uid
    }
})
router.get('/latest', async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    });
    const art = await Art.getData(flow.art_id, flow.type);
    ctx.body = {
        data: {
            id: flow.id,
            image: art.image,
            content: art.content,
            title: art.title,
        }
    }
})

module.exports = router