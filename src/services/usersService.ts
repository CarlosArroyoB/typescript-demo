import IUser from "../interfaces/IUser";
import UserDto from "../dto/UserDto";
import { userModel } from "../config/data-source";
import { User } from "../entities/User";

export const createUserService = async (userData: UserDto) => {
  //!un async SIEMPRE RETORNA una PROMESA que se resuelve a un determinado valor, en este caso IUser
  const user: User = await userModel.create(userData);
  await userModel.save(user);
  return user;
};
export const getUserService = async (): Promise<User[]> => {
  const users: User[] = await userModel.find({
    relations: {
      vehicles: true,
    },
  });
  return users;
};
export const getUsersByIdService = async (
  ide: number
): Promise<User | null> => {
  const user = await userModel.findOneBy({ id: ide });
  return user;
};

export const deleteUserService = async (id: number) => {
  const user = await userModel.delete(id);
  return user;
};
