import { writeFile } from 'fs/promises';
import path from 'path';
import {usersLogsDirectory} from "../app/config.js";

export async function saveUsersLogs(userEmail, date, status) {
    const dirName = path.dirname('../');
    const fileName = path.join(dirName, usersLogsDirectory, 'usersLogs.txt');
    const userLog = `${JSON.stringify({ userEmail, date, status })}\n`;

    await writeFile(fileName, userLog, {
        flag: 'a',
    });
}
