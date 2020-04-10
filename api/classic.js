const {User} = require('../models/user'); 
const {Success, ParameterException} = require('../core/http-exception'); 
const {TokenValidator} = require('../validators/validators.js');
const {LoginType} = require('../lib/enum');
const {generateToken} = require('../core/util');
const {Auth} = require('../middleware/auth');

const Router = require('koa-router');
const router = new Router({
    prefix:'/v1/classic'
});

router.get('/',new Auth(3).m,async (ctx,next)=>{
    const body = ctx.request.body;
    ctx.body={
        uid:ctx.auth.uid
    }
})

module.exports = router