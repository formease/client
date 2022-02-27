"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/dashboard', async ({ view }) => {
    return view.render('dashboard', {
        data: [
            {
                projectName: 'hello',
                projectDescription: 'world',
            },
            {
                projectName: 'hello2',
                projectDescription: 'world2',
            },
        ],
    });
});
//# sourceMappingURL=dashboard.js.map