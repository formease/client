"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
Route_1.default.post('/createForm', async ({ request, response }) => {
    console.log(request.body());
    await Database_1.default.table('users').insert({
        uid: 'asdas',
        name: `${request.body().projectName}`,
        description: `${request.body().projectDescription}`,
        discord: `${request.body().discordWebhook}`,
    });
    return response.send({
        status: 200,
        data: {
            projectName: request.input('projectName'),
            projectDescription: request.input('projectDescription'),
        },
    });
});
//# sourceMappingURL=create.js.map