import { AppDataSource} from "../config/data-source";
import UserRepository from "../repositories/UserRepository";    
import VehicleRepository from "../repositories/VehicleRepository";


const preloadUsers = [
  {
    name: "Carlos Arroyo",
    email: "carlosholu@gmail.com",
    age: 25,
    active: true,
  },
  {
    name: "Alfiler Colitas",
    email: "alfo123@gmail.com",
    age: 6,
    active: true,
  },
  {
    name: "Gaspar Corleone",
    email: "gaspacho123@gmail.com",
    age: 5,
    active: true,
  },
  {
    name: "Otto Ottelio",
    email: "Elotts@gmail.com",
    age: 6,
    active: true,
  },
];

const preloadVehicles = [
  {
    brand: "Ford",
    color: "red",
    age: 2020,
    userId: 1,
  },
  {
    brand: "Toyota",
    color: "White",
    age: 2022,
    userId: 2,
  },
  {
    brand: "Suzuki",
    color: "Brown",
    age: 2019,
    userId: 3,
  },
  {
    brand: "Mercedes Benz",
    color: "Blue",
    age: 2021,
    userId: 5,
  },
];

export const preloadUserData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const users = await UserRepository.find();
      if (users.length) {
        return console.log(
          "No se hizo la precarga de datos, porque ya hay datos"
        );
      }
      for await (const user of preloadUsers) {
        const newUser = await UserRepository.create(user);
        await transactionalEntityManager.save(newUser);
      }
    }
  );
};

export const preloadVehicleData = async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  const promises = preloadVehicles.map(async (vehicle) => {
    const newVehicle = await VehicleRepository.create(vehicle);
    await queryRunner.manager.save(newVehicle);
    const user = await UserRepository.findOneBy({ id: vehicle.userId });
    if (!user) throw Error("Usuario inexistente");
    newVehicle.user = user;
    queryRunner.manager.save(newVehicle);
  });

  try {
    await queryRunner.startTransaction();

    await Promise.all(promises);

    console.log("Precarga de vehiculos realizada con éxito");

    await queryRunner.commitTransaction();
  } catch (error) {
    console.log("error al intentar crear vehiculos")
    await queryRunner.rollbackTransaction();
  }finally{
    console.log("Ha finalizado el intento de precarga")
    await queryRunner.release();
  }
};
