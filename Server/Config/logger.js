import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  colorize: true,
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/debug.log", level: "debug" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "cyan"
});

logger.exceptions.handle(
  new winston.transports.File({ filename: "logs/exceptions.log" })
);

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

logger.on("finish", info => {
  logger.end();
});

logger.on("error", err => {
  logger.end();
});

export default logger;
