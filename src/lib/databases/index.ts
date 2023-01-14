import { DB_HOST, DB_PASS, DB_CLUSTER, DB_DATABASE, DB_ACCESS } from '../../config';
import { connect, connection, ConnectOptions } from 'mongoose';
import * as chalk from 'chalk';

const connected = chalk.default.bold.cyan;
const error = chalk.default.bold.yellow;
const disconnected = chalk.default.bold.red;
const termination = chalk.default.bold.magenta;

const mongoUrl = (): string => {
  const configs = {
    dbAccess: DB_ACCESS || 'local',
    user: DB_HOST || '',
    pass: DB_PASS || '',
    cluster: DB_CLUSTER || '',
    db: DB_DATABASE || 'SpotChat',
  };

  if (configs.dbAccess === 'local') {
    return `mongodb://localhost:27017/${configs.db}`;
  }

  return `mongodb+srv://${configs.user}:${configs.pass}@${configs.cluster}.mongodb.net/${configs.db}?retryWrites=true`;
};

export const dbConnection = {
  url: mongoUrl(),
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  },
};

export const mongoConnection = () => {
  const dbURL: any = dbConnection.url;
  console.log('db url is ', dbURL);
  connect(dbURL, dbConnection.options as ConnectOptions);

  connection.on('connected', () => {
    console.log(connected('Mongoose default connection is open to ', dbURL, '\u{1F60D}'));
  });

  connection.on('error', err => {
    console.log(error('Mongoose default connection has occured ' + err + ' error'));
  });

  connection.on('disconnected', () => {
    console.log(disconnected('Mongoose default connection is disconnected'));
  });

  process.on('SIGINT', () => {
    connection.close(() => {
      console.log(termination('Mongoose default connection is disconnected due to application termination'));
      process.exit(0);
    });
  });
};
