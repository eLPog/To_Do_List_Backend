import { writeFile } from 'fs/promises';
import path from 'path';
import {errorsLogsDirectory} from "../app/config.js";
import {getActuallyDate} from "./getActuallyDate.js";

export async function saveErrors(error,action) {
    const dirName = path.dirname('../');
    const fileName = path.join(dirName, errorsLogsDirectory, 'errors.txt');
    const date = getActuallyDate()
    const userLog = `${JSON.stringify({ date,error,action})}\n`;

    await writeFile(fileName, userLog, {
        flag: 'a',
    });
}