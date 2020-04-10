const {User} = require('../models/user'); 
const {Success} = require('../core/http-exception'); 
const Router = require('koa-router');
const router = new Router({
    prefix:'/v1/user'
});
const {RegisterValidator} = require('../validators/validators.js');

router.post('/register',async (ctx,next)=>{
    const body = ctx.request.body;
    const v = await new RegisterValidator().validate(ctx);
    const user = {
        email:body.email,
        password:body.password1,
        nickname:body.nickname
    }
    await User.create(user);
    throw new Success();
    // ctx.body={
    //     msg:'hello world'
    // }
})
module.exports = router