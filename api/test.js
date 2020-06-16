const Router = require('koa-router');
const router = new Router();
const {PositiveIntegerValidator} = require('../validators/validators.js');

router.get('/test/:id',async (ctx,next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx);
    ctx.body={
        msg:'hello world'
    }
})
module.exports = router