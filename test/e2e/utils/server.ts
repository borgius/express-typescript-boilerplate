import { setConnection } from 'typeorm-seeding';

import { migrateDatabase } from '../../utils/database';
import { bootstrapApp } from './bootstrap';

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
