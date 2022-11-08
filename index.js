import { appendFile, writeFile } from 'fs/promises';
const LOGFILE_PATH = process.env.LOGFILE_PATH;

export default function logger(mssg) {
  return appendFile(LOGFILE_PATH, `${new Date().toISOString()} -> ${mssg}\n`, 'utf8').catch(
    (err) => {
      // silently fail
      console.error(err);
    }
  );
}
