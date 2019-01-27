import { setConnection } from 'typeorm-seeding';

import { bootstrapApp } from './bootstrap';
import { migrateDatabase } from './database';

export const prepareServer = async (options?: { migrate?: boolean, sync?: boolean }) => {
    const settings = await bootstrapApp();
    if (options && options.migrate) {
        await migrateDatabase(settings.connection);
    }
    if (options && options.sync) {
        await settings.connection.synchronize(true);
    }
    setConnection(settings.connection);
    return settings;
};
