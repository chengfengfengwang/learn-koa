const basicAuth = require('basic-auth');
const {AuthFailed} = require('../core/http-exception');
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    //类常量
    Auth.USER=8;
    Auth.ADMIN=16;
    Auth.SUPER_ADMIN=32;
    this.level = level;
  }
  static verifyToken(token){
    try {
      var decoded = jwt.verify(token,global.config.security.secretKey)
    } catch (error) {
      return false
    }
    return true
  }
  get m() {
      return async (ctx,next)=>{
        const userToken = basicAuth(ctx.req);
        const token = ctx.request.header.token;
        if(!userToken || !userToken.name){
        //if(!token){
          throw new AuthFailed('token不合法')
        }else{
          try {
            var decoded = jwt.verify(userToken.name,global.config.security.secretKey)
          } catch (error) {
            if(error.name=='TokenExpiredError'){
              throw new AuthFailed('token已过期')
            }
            throw new AuthFailed('token不合法')
          }
        }
        ctx.auth = {
          uid:decoded.uid,
          scope:decoded.scope
        };
        
        if(decoded.scope<this.level){
          throw new AuthFailed('权限不足')
        }
        await next()
      }
    
  }
}
module.exports = {Auth}