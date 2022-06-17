"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const config_1 = require("../app/config");
const db = (0, promise_1.createPool)({
    database: config_1.dbSettings.database,
    host: config_1.dbSettings.host,
    user: config_1.dbSettings.user,
    namedPlaceholders: true,
    decimalNumbers: true
});
exports.default = db;
//# sourceMappingURL=dbConnection.js.map