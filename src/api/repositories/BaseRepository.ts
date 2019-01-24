import { Repository } from 'typeorm';

import { IBaseRepository } from '../interfaces/IBaseRepository';
import { BaseEntity } from '../models/BaseEntity';

export abstract class BaseRepository<T extends BaseEntity> extends Repository<T> implements IBaseRepository<T> {
}
