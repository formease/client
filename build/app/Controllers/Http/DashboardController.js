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
const firebaseApp = __importStar(global[Symbol.for('ioc.use')]("Firebase"));
class DashboardController {
    async index(ctx) {
        let data;
        try {
            const verify = await firebaseApp.auth().verifyIdToken(ctx.request.cookiesList()['user']);
            if (!verify.uid)
                return ctx.view.render('errors/unauthorized');
            data = await Database_1.default.from('users').where('uid', verify.uid);
            return ctx.view.render('dashboard', {
                data: data,
            });
        }
        catch (error) {
            return ctx.view.render('errors/unauthorized');
        }
    }
    async user(ctx) {
        let data;
        let list;
        try {
            const verify = await firebaseApp.auth().verifyIdToken(ctx.request.cookiesList()['user']);
            if (!verify.uid)
                return ctx.view.render('errors/unauthorized');
            data = await Database_1.default.from('users')
                .where('formid', ctx.params.formid)
                .where('uid', verify.uid);
            if (data.length === 0)
                return ctx.view.render('errors/unauthorized');
            list = await Database_1.default.from('users').where('uid', verify.uid);
            return ctx.view.render('project', {
                list: list,
                project: data[0],
            });
        }
        catch (error) {
            return ctx.view.render('errors/unauthorized');
        }
    }
}
exports.default = DashboardController;
//# sourceMappingURL=DashboardController.js.map