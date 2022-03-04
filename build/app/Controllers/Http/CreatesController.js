"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const uuid_1 = require("uuid");
class CreatesController {
    async index(ctx) {
        const { user } = ctx.request.body();
        const { projectName, projectDescription, discordWebhook } = ctx.request.body().request;
        const data = await Database_1.default.from('users').where('uid', user);
        if (data.length === 5) {
            return ctx.response.status(403).send('You have reached the maximum number of projects');
        }
        const formId = (0, uuid_1.v4)();
        await Database_1.default.table('users').insert({
            uid: `${user}`,
            formId: formId,
            name: `${projectName}`,
            description: `${projectDescription}` ? `${projectDescription}` : '',
            discord: `${ctx.request.body().request['Discord Webhook Support'] ? discordWebhook : null}`,
            sheets: `${ctx.request.body().request['Google Support'] ? 'done' : null}`,
        });
        return ctx.response.send({
            status: 200,
            data: {
                message: 'Project created successfully',
                id: formId,
            },
        });
    }
}
exports.default = CreatesController;
//# sourceMappingURL=CreatesController.js.map