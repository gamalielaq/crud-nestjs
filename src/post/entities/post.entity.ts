import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'varchar', length: 255})
    slug:string;

    @Column({type: 'varchar', length: 150})
    title:string;

    @Column({type: 'varchar', length: 255})
    excerpt?:string;

    @Column({type: 'text' })
    content:string;

    @Column({type: 'varchar', length: 100, nullable: true})
    category:string;

    @Column({type: 'simple-array'})
    tags:string[];
    status:boolean;
    
    @CreateDateColumn( {type: 'timestamp'})
    crateAt: Date;
}