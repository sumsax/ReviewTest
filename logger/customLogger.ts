import {createLogger, format, transports} from 'winston';
//var log = require('log-timestamp');
const { combine, timestamp, label, prettyPrint, printf } = format;
export class CustomLogger{
     mydate = new Date();
    public static myFormat = printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
      });
    static logger = createLogger({
        level: 'info',
            
        format: combine(
            label({ label: 'right meow!' }),
            timestamp(),
            CustomLogger.myFormat
          ),

        transports: [
        new transports.File({ filename:  'combined.log'}),
        new transports.Console()
        ]
    });
  static error: any;
}