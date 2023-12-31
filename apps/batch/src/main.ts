import { CommandFactory } from 'nest-commander';
import { BatchModule } from './batch.module';

async function bootstrap() {
  await CommandFactory.run(BatchModule, {
    logger: ['log', 'error', 'debug', 'warn'],
  });
}

bootstrap();
