"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async ({ view }) => {
    return view.render('welcome');
});
Route_1.default.group(() => {
    Route_1.default.get('/dashboard', 'DashboardController.index');
    Route_1.default.get('/dashboard/:formid', 'DashboardController.user');
});
Route_1.default.post('/createForm', 'CreatesController.index');
Route_1.default.post('/deleteForm', 'CreatesController.delete');
Route_1.default.post('/f/:formid', 'FormsController.index');
Route_1.default.get('auth', async ({ view }) => {
    return view.render('auth');
});
//# sourceMappingURL=routes.js.map