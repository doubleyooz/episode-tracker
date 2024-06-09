import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

export const DrizzleAsyncProvider = 'DrizzleProvider';

export const DrizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const database = configService.get<string>('POSTGRES_DB');
      const user = configService.get<string>('POSTGRES_USER');
      const password = configService.get<string>('POSTGRES_PASSWORD');
      const port = configService.get<number>('POSTGRES_PORT');
      const host = configService.get<string>('POSTGRES_HOST');
      const pool = new Pool({
        connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
      });

      return drizzle(pool, { schema });
    },
    exports: [DrizzleAsyncProvider],
  },
];
