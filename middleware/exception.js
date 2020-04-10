const {HttpException} = require('../core/http-exception.js');
async function catchError(ctx, next) {
  try {
    await next();
  } catch (error) {
      const isHttpException = error instanceof HttpException;
      const isDev = global.config.environment==='env';
      if(isDev && !isHttpException){
        throw error;
      }
      if(isHttpException){
        ctx.status = error.status;
        ctx.body = {
          msg: error.msg,
          errorCode: error.errorCode,
          requsetUrl: `${ctx.method} ${ctx.path}`
        };
      }else{
        ctx.status = 500;
        ctx.body = {
          msg: '服务器发生了未知错误',
          errorCode: 10000,
          requsetUrl: `${ctx.method} ${ctx.path}`
        };
      }
    
  }
}
module.exports = catchError;
