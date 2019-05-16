import config from 'config';
import { createLogger, transports, format } from 'winston';
import { DateTime } from 'luxon';

const { printf } = format;
const logging = config.get('logging');

/*
 * Luxon automatically takes care of the timezone and DST
 * - https://github.com/moment/luxon/blob/master/docs/zones.md#local-by-default
 * - https://github.com/moment/luxon/blob/master/docs/zones.md#dst-weirdness
 */
const customFormat = printf(
  info =>
    `[${DateTime.local().toFormat(logging.dateFormat)}] [${
      process.pid
    }] ${info.level.toUpperCase()}: ${info.message}`
);

/*
 * @see https://github.com/winstonjs/winston/blob/3.0.0/lib/winston/logger.js#L46
 */
const logger = createLogger({
  format: customFormat,
  exitOnError: false
});

/*
 * @see https://github.com/winstonjs/winston/blob/3.0.0/lib/winston/transports/console.js
 */
logger.add(
  new transports.Console({
    level: logging.level,
    handleExceptions: true
  })
);

export default logger;
