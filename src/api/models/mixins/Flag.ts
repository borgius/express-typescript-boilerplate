import { Column } from 'typeorm';

export class Flag {
    @Column()
    public flags: string[];
}
