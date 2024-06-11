import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
    name: "vehicle",
})

export class Vehicle{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        length:50
    })
    brand: string;
    @Column({
        length:50   
    })
    color: string;
    
    @Column("integer")
    age: number;

    @ManyToOne(() => User,(user) => user.vehicles)
    user: User

}