import { userModel, vehicleModel } from "../config/data-source";
import VehiclesDto from "../dto/VehiclesDto";
import { Vehicle } from "../entities/Vehicle";
export const getVehicleService = async () => {
  const vehicle: Vehicle[] = await vehicleModel.find({
    relations: {
      user: true,
    },
  });
  return vehicle;
};

export const createVehicleService = async (VehiclesData: VehiclesDto) => {
  const newVehicle = await vehicleModel.create(VehiclesData);
  await vehicleModel.save(newVehicle);
  //Para este punto el vehiculo ya esta creado, pero me falta indicar quien es su dueño
  const userId = await userModel.findOneBy({ id: VehiclesData.userId });
  // if(userId){
  //     userId.vehicle = vehicle;
  // await userModel.save(userId);
  // }else{
  //     throw Error ("Usuario inexistente")
  // }
  if (userId) {
    newVehicle.user = userId;
    vehicleModel.save(newVehicle);
  }

  return newVehicle;
};
