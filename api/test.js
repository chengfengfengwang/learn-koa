const Router = require('koa-router');
const router = new Router();
const {ParameterException} = require('../core/http-exception');
const {PositiveIntegerValidator} = require('../validators/validators.js');

router.get('/test/:id',(ctx,next)=>{
    const v = new PositiveIntegerValidator().validate(ctx);
    throw new Error('qwer')
    ctx.body={
        msg:'hello world'
    }
    // let error = new ParameterException();
    // throw error
})
module.exports = router