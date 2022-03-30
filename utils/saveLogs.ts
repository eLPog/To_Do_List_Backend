import { writeFile } from 'fs/promises';
import path from 'path';
import {getActuallyDate} from "./getActuallyDate";
import {usersLogsDirectory} from "../app/config";

export async function saveUsersLogs(userEmail:string, status:string):Promise<void> {
    const dirName = path.dirname('../');
    const fileName = path.join(dirName, usersLogsDirectory, 'usersLogs.txt');
    const date = getActuallyDate();
    const userLog = `${JSON.stringify({ userEmail, date, status })}\n`;

    await writeFile(fileName, userLog, {
        flag: 'a',
    });
}
