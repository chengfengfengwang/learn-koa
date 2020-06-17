class HttpException extends Error{
    constructor(msg='服务器出错了',status=400,errorCode=10000){
        super();
        this.msg = msg;
        this.status = status;
        this.errorCode = errorCode;
    }
}
class ParameterException extends HttpException{
    constructor(msg='参数出错了',status=400,errorCode=10000){
        super();
        this.msg = msg;
        this.status = status;
        this.errorCode = errorCode;
    }
}
class Success extends HttpException{
    constructor(msg='ok',status=201,errorCode=0){
        super();
        this.msg = msg;
        this.status = status;
        this.errorCode = errorCode;
    }
}
class NotFound extends HttpException{
    constructor(msg='资源未找到',status=404,errorCode=10000){
        super();
        this.msg = msg;
        this.status = status;
        this.errorCode = errorCode;
    }
}
class AuthFailed extends HttpException{
    constructor(msg='授权失败',status=401,errorCode=10004){
        super();
        this.msg = msg;
        this.status = status;
        this.errorCode = errorCode;
    }
}
class LikeError extends HttpException{
    constructor(msg='已经点过赞了',status=400,errorCode=10004){
        super();
        this.msg = msg;
        this.status = status;
        this.errorCode = errorCode;
    }
}
module.exports = {
    LikeError,
    Success,
    NotFound,
    AuthFailed,
    HttpException,
    ParameterException
};