import {createPool} from "mysql2/promise";
import {dbSettings} from "../app/config";

export const db = createPool({
    database:dbSettings.database,
    host:dbSettings.host,
    user:dbSettings.user,
    namedPlaceholders:true,
    decimalNumbers:true
})
