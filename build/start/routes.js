"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
require("./routes/dashboard");
require("./routes/create");
Route_1.default.get('/', async ({ view }) => {
    return view.render('welcome');
});
Route_1.default.get('auth', async ({ view }) => {
    return view.render('auth');
});
Route_1.default.get('*', async ({ view }) => {
    return view.render('errors/not-found');
});
//# sourceMappingURL=routes.js.map