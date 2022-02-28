"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
Route_1.default.get('/dashboard', async ({ view, request }) => {
    const data = await Database_1.default.from('users').where('uid', request.cookiesList().uid);
    return view.render('dashboard', {
        data: data,
    });
});
//# sourceMappingURL=dashboard.js.map