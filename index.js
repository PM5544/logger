import { appendFile } from "node:fs/promises";
import { env } from "node:process";

const LOGFILE_PATH = env.LOGFILE_PATH;
const LOG_LEVEL = env.LOG_LEVEL;
const LEVELS = ["error", "log", "info", "debug"];
const index = LEVELS.indexOf(LOG_LEVEL);
const LEVEL = index === -1 ? 0 : index;

export default function logger(_messageOrLevel, _message = false) {
  if (!LOGFILE_PATH) {
    return Promise.resolve();
  }

  let message;

  if (_messageOrLevel && _message) {
    if (LEVELS.indexOf(_messageOrLevel) > LEVEL) {
      return Promise.resolve();
    }
    message = _message;
  } else if (_messageOrLevel && !_message) {
    message = _messageOrLevel;
  }

  return appendFile(
    LOGFILE_PATH,
    `${new Date().toISOString()} -> ${message}\n`,
    "utf8"
  ).catch((err) => {
    // silently fail
    console.error(err);
  });
}
