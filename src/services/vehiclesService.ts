import { AppDataSource } from "../config/data-source";
import VehicleRepository from "../repositories/VehicleRepository";
import UserRepository from "../repositories/UserRepository";
import VehiclesDto from "../dto/VehiclesDto";
import { Vehicle } from "../entities/Vehicle";
export const getVehicleService = async () => {
  const vehicle: Vehicle[] = await VehicleRepository.find({
    relations: {
      user: true,
    },
  });
  return vehicle;
};

export const createVehicleService = async (VehiclesData: VehiclesDto) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    queryRunner.startTransaction();

    const newVehicle = await VehicleRepository.create(VehiclesData);
    await queryRunner.manager.save(newVehicle);

    const user = await UserRepository.findOneBy({ id: VehiclesData.userId });
    if (!user)
      throw Error("Usuario inexistente. No se ha podido crear el vehículo");

    newVehicle.user = user;
    queryRunner.manager.save(newVehicle);

    await queryRunner.commitTransaction();

    return newVehicle;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw Error("Usuario inexistente");
  } finally {
    queryRunner.release();
  }
};
