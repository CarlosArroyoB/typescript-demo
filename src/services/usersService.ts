import IUser from "../interfaces/IUser";
import UserRepository from "../repositories/UserRepository";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";

export const createUserService = async (userData: UserDto) => {
  //!un async SIEMPRE RETORNA una PROMESA que se resuelve a un determinado valor, en este caso IUser
  const user: User = await UserRepository.create(userData);
  await UserRepository.save(user);
  return user;
};
export const getUserService = async (): Promise<User[]> => {
  const users: User[] = await UserRepository.find({
    relations: {
      vehicles: true,
    },
  });
  return users;
};
export const getUsersByIdService = async (
  ide: number
): Promise<User | null> => {
  const user = await UserRepository.findOneBy({ id: ide });
  return user;
};

export const deleteUserService = async (id: number) => {
  const user = await UserRepository.delete(id);
  return user;
};
