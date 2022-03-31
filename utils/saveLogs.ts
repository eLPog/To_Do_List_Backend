import { writeFile } from 'fs/promises';
import * as path  from 'path';
import {getActuallyDate} from "./getActuallyDate";
import {usersLogsDirectory} from "../app/config";

export async function saveUsersLogs(userEmail:string, status:string):Promise<void> {
    const fileName = path.join(__dirname, usersLogsDirectory, 'usersLogs.txt')
    const date = getActuallyDate();
    const userLog = `${JSON.stringify({ userEmail, date, status })}\n`;

    await writeFile(fileName, userLog, {
        flag: 'a',
    });
}
