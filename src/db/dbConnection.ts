import {createPool} from "mysql2/promise";
import {dbSettings} from "../app/config";

const db = createPool({
    database:'to_do_list_version1',
    host:'localhost',
    user:'root',
    namedPlaceholders:true,
    decimalNumbers:true
})
export default db
