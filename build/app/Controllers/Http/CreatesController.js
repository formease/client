"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const uuid_1 = require("uuid");
const firebaseApp = __importStar(global[Symbol.for('ioc.use')]("Firebase"));
class CreatesController {
    async index(ctx) {
        const verify = await firebaseApp.auth().verifyIdToken(ctx.request.cookiesList()['user']);
        if (!verify.uid)
            return ctx.view.render('errors/unauthorized');
        const { projectName, projectDescription, discordWebhook } = ctx.request.body().request;
        const data = await Database_1.default.from('users').where('uid', verify.uid);
        if (data.length === 5) {
            return ctx.response.status(403).send('You have reached the maximum number of projects');
        }
        const formId = (0, uuid_1.v4)();
        await Database_1.default.table('users').insert({
            uid: `${verify.uid}`,
            formId: formId,
            name: `${projectName}`,
            description: `${projectDescription}` ? `${projectDescription}` : '',
            discord: `${ctx.request.body().request['Discord Webhook Support'] ? discordWebhook : null}`,
            sheets: `${ctx.request.body().request['Google Support'] ? 'done' : null}`,
        });
        return ctx.response.accepted({
            data: {
                message: 'Project created successfully !!!',
                id: formId,
            },
        });
    }
    async delete(ctx) {
        const userid = ctx.request.cookiesList()['user'];
        const verify = await firebaseApp.auth().verifyIdToken(userid);
        if (!verify.uid)
            return ctx.view.render('errors/unauthorized');
        await Database_1.default.from('users')
            .where('uid', verify.uid)
            .where('formId', ctx.request.body().request)
            .delete();
        return ctx.response.accepted({
            data: {
                message: 'Project deleted successfully !!!',
            },
        });
    }
}
exports.default = CreatesController;
//# sourceMappingURL=CreatesController.js.map