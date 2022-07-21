import { Entity, Column, PrimaryColumn, ObjectIdColumn } from 'typeorm'

@Entity()
export class Topic {

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    partitions: number;

    @Column()
    replicas: number;
}