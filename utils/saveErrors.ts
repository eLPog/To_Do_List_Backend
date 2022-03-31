import { writeFile } from 'fs/promises';
import * as path from 'path';
import { errorsLogsDirectory } from '../app/config';
import { getActuallyDate } from './getActuallyDate';

export async function saveErrors(error:Error, action:string):Promise<void> {
  const fileName = path.join(__dirname, errorsLogsDirectory, 'errors.txt');
  const date = getActuallyDate();
  const userLog = `${JSON.stringify({ date, error, action })}\n`;

  await writeFile(fileName, userLog, {
    flag: 'a',
  });
}
