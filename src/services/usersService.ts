import IUser from "../interfaces/IUser";
import UserDto from "../dto/UserDto";

let users: IUser[] = [
  {
    id: 1,
    name: "Carlos",
    email: "carlos_01_98@hotmail.com",
    active: true,
  },
];

let id: number = 1;

export const createUserService = async (userData: UserDto): Promise<IUser> => {
  //!un async SIEMPRE RETORNA una PROMESA que se resuelve a un determinado valor, en este caso IUser
  //Recibir datos del usuario
  //Crear nuevo usuario
  //Incluir nuevo usuario dentro de arreglo users
  //retronar el objeto creado
  const newUser: IUser = {
    id,
    name: userData.name,
    email: userData.email,
    active: userData.active,
  };
  users.push(newUser);
  id++;
  return newUser;
};
export const getUserService = async (): Promise<IUser[]> => {
  return users;
};
export const deleteUserService = async (id: number): Promise<void> => {
  users = users.filter((user: IUser) => {
    return user.id !== id;
  });
};
