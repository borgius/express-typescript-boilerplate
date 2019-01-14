import DataLoader from 'dataloader';
import { ObjectType } from 'typedi';
import { getCustomRepository, getRepository, In, Repository } from 'typeorm';

// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------

export * from './graphql-error-handling';

// -------------------------------------------------------------------------
// Main Functions
// -------------------------------------------------------------------------

export interface CreateDataLoaderOptions {
    method?: string;
    key?: string;
    multiple?: boolean;
}

/**
 * Creates a new dataloader with the typorm repository
 */
export function createDataLoader<T>(obj: ObjectType<T>, options: CreateDataLoaderOptions = {}): DataLoader<any, any> {
    let repository;
    try {
        repository = getCustomRepository<Repository<any>>(obj);
    } catch (errorRepo) {
        try {
            repository = getRepository(obj);
        } catch (errorModel) {
            throw new Error('Could not create a dataloader, because obj is nether model or repository!');
        }
    }

    return new DataLoader(async (ids: number[]) => {
        let items = [];
        const key = options.key || 'id';
        if (options.method) {
            items = await repository[options.method](ids);
        } else {
            items = await repository.find({key: In(ids)});
        }
        const handleBatch = (arr: any[]) => options.multiple === true ? arr : arr[0];
        const res = ids.map(id => handleBatch(items.filter(item => item[key] === id)));
        console.log(res);
        return res;
    });
}
