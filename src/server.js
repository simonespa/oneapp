import config from 'config';
import cluster from 'cluster';
import { cpus } from 'os';
import app from './app';

const port = 8080;
const isClusteringEnabled = config.get('clustering') === 'on';
const cpuCount = cpus().length;

const onExit = (worker, code, signal) => {
  let message;
  if (signal) {
    message = `Worker ${worker.process.pid} was killed by signal ${signal}`;
  } else if (code !== 0) {
    message = `Worker ${worker.process.pid} exited with error code ${code}`;
  } else {
    message = `Worker ${worker.process.pid} exited with no error`;
  }
  message = `${message}. Forking a new one.`;
  console.error(message);
  cluster.fork();
};

const startSever = () => {
  if (isClusteringEnabled && cpuCount > 1 && cluster.isMaster) {
    console.info('Process started: forking new workers.');

    for (let i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }

    // Listen for dying workers and create a new one
    cluster.on('exit', onExit);
  } else {
    app.listen(port, (error) => {
      if (error) {
        console.error(error.message);
      } else {
        console.info(`Process started: listening on port ${port}`);
      }
    });
  }
};

startSever();
