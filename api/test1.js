const Router = require('koa-router');
const router = new Router();
router.get('/test1',(ctx,next)=>{
    ctx.response.body = 'hello test1'
})
module.exports = router