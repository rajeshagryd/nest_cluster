import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cluster from 'cluster';
import * as os from 'os';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 4000;
  const numCPUs = os.cpus().length;
  // console.log("========",(cluster as any).isMaster)
  if ((cluster as any).isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      (cluster as any).fork();
    }

    (cluster as any).on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      (cluster as any).fork()
    });
  } else {
    await app.listen(PORT + (cluster as any).worker.id - 1, () => {
      // console.log(`worker Id ${(cluster as any).worker.id}`)
      console.log(`Worker ${process.pid} started and listening on port ${PORT + (cluster as any).worker.id - 1}`);
    });
  }
  // await app.listen(3000);
}

bootstrap();