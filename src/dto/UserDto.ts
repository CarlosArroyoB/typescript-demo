import { Vehicle } from "../entities/Vehicle";

interface UserDto {
  name: string;
  email: string;
  age: number,
  active: boolean;
  vehicle:Vehicle
}
export default UserDto;
