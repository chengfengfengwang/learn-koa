const { Favor } = require('../models/favor');
const { Art } = require('../models/art');

const { Success, ParameterException } = require('../core/http-exception');
const { TokenValidator } = require('../validators/validators.js');
const { Auth } = require('../middleware/auth');

const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/like'
});


router.post('/',new Auth().m,  async (ctx, next) => {
    const body = ctx.request.body;
    let art = await Art.getData(1, 100)
    ctx.body = art
})

module.exports = router