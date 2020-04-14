const { User } = require('../models/user');
const { Success, ParameterException } = require('../core/http-exception');
const { TokenValidator } = require('../validators/validators.js');
const { LoginType } = require('../lib/enum');
const { generateToken } = require('../core/util');
const { Auth } = require('../middleware/auth');

const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/token'
});

router.post('/', async (ctx, next) => {
    const body = ctx.request.body;
    const v = await new TokenValidator().validate(ctx);
    switch (body.type) {
        case LoginType.USER_EMAIL:
            console.log(body.account, body.secret)
            const token = await emailLogin(body.account, body.secret)
            ctx.body = {
                token
            }
            break;
        case LoginType.USER_MINI_PROGRAM:
            const token = await User.wxLogin(body.code)
            ctx.body = {
                token
            }
            break;
        default:
            throw new ParameterException('没有相应的处理函数');
    }

    //throw new Success();
})
async function emailLogin(account, secret) {
    //从数据库验证账号和密码
    const user = await User.verifyEmailPassword(account, secret);
    //使用jsonwebtoken生成包含uid和scope的token令牌
    return generateToken(user.id, Auth.USER)
}
module.exports = router