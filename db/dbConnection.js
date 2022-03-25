import {createPool} from "mysql2/promise";
import {dbSettings} from "../app/config.js";

export const db = await createPool({
    database:dbSettings.database,
    host:dbSettings.host,
    user:dbSettings.user,
    namedPlaceholders:true,
    decimalNumbers:true
})
