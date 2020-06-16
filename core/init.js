const requireDirectory = require('require-directory');
const httpExceptions = require('./http-exception');
class appManager{
    static init(app){
        appManager.app = app;
        appManager.loadConfig();
        appManager.initRoutes();
        appManager.loadHttpException();
    } 
    static loadConfig(){
        const config = require(`${process.cwd()}/config/config`);
        global.config = config;
    }
    static initRoutes(){
        requireDirectory(module, `${process.cwd()}/api`, {
            visit(obj) {
                appManager.app.use(obj.routes());
            }
        });
    }
    static loadHttpException(){
        global.errors = httpExceptions;
    }
};
module.exports = appManager;