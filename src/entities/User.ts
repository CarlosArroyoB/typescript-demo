import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity({
  name: "users",
}) //Crea una tabla llamada users *importante ponerlo en plural*
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  name: string; //VARCHAR(100)

  @Column()
  email: string;

  @Column("integer")
  age: number;

  @Column()
  active: boolean;

  // @OneToOne(()=>Vehicle)
  // @JoinColumn()
  // vehicle:Vehicle;
  @OneToMany(()=> Vehicle,(vehicle => vehicle.user))
  vehicles:Vehicle[];
}

// interface IUser {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//     active: boolean;
//   }
