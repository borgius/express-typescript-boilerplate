import { Field, ID } from 'type-graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export class Base {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Field(type => ID)
    public id: number;

    @CreateDateColumn()
    @Field()
    public createdAt: Date;

    @UpdateDateColumn()
    @Field()
    public updatedAt: Date;

    @VersionColumn()
    @Field()
    public version: number;

    // @Column()
    // public flags: string[];
}
