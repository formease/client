"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
class AppProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
    }
    async boot() {
        Logger_1.default.info('App is booted');
    }
    async ready() {
        Logger_1.default.info('App is ready !!!');
    }
    async shutdown() {
        Logger_1.default.info('App is about to shut down');
    }
}
exports.default = AppProvider;
//# sourceMappingURL=AppProvider.js.map