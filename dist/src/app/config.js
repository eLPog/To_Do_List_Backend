"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSettings = exports.errorsLogsDirectory = exports.usersLogsDirectory = exports.jwtAccessKey = exports.dbSettings = exports.port = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const port = parseInt(process.env.PORT || '3000');
exports.port = port;
const dbSettings = {
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    user: process.env.DBUSER
};
exports.dbSettings = dbSettings;
const emailSettings = {
    emailHost: process.env.EMAILHOST,
    emailPort: process.env.EMAILPORT,
    emailUser: process.env.EMAILUSER,
    emailPass: process.env.EMAILPASS
};
exports.emailSettings = emailSettings;
const jwtAccessKey = process.env.JWTACCESS;
exports.jwtAccessKey = jwtAccessKey;
const usersLogsDirectory = process.env.USERSLOGSDIRECTORY;
exports.usersLogsDirectory = usersLogsDirectory;
const errorsLogsDirectory = process.env.ERRORSLOGSDIRECTORY;
exports.errorsLogsDirectory = errorsLogsDirectory;
//# sourceMappingURL=config.js.map