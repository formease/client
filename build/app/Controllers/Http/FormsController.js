"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormsController {
    async index(ctx) {
        console.log(ctx.request.body());
        ctx.response.accepted({
            message: 'Form submitted successfully',
        });
    }
}
exports.default = FormsController;
//# sourceMappingURL=FormsController.js.map