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
      const db_url = configService.get<string>('POSTGRES_URL');
      const db_ssl = configService.get<boolean>('POSTGRES_SSL');
      const pool = new Pool({
        connectionString: db_url,
        ssl: db_ssl,
      });

      return drizzle(pool, { schema });
    },
    exports: [DrizzleAsyncProvider],
  },
];
