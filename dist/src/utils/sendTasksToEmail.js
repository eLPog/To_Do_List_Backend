"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTasksToEmail = void 0;
const mailerConfig_1 = require("./mailerConfig");
function sendTasksToEmail(email, tasks) {
    return __awaiter(this, void 0, void 0, function* () {
        const tasksToSend = tasks.join(`, `);
        const transporter = yield (0, mailerConfig_1.nodemailerConfig)();
        yield transporter.sendMail({
            from: `To Do List`,
            to: email,
            subject: `You tasks from To Do List`,
            text: tasksToSend,
            html: `<b>Your tasks from To Do List:</b><p>${tasksToSend}</p>`
        });
    });
}
exports.sendTasksToEmail = sendTasksToEmail;
//# sourceMappingURL=sendTasksToEmail.js.map