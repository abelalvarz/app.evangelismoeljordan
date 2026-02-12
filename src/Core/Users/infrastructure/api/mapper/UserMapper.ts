import { User } from "../../../domain/model/User";

export class UserMapper {
  static toDomain(apiUserData: any): User {
    return {
      id: apiUserData.id,
      name: apiUserData.name,
      email: apiUserData.email,
      familyGroup: {
        id: apiUserData.cell.id,
        name: apiUserData.cell.name,
      },
      role: apiUserData.roles,
      status: apiUserData.status,
    };
  }
  static toCreateUserRequest(data: any): any {
    return {
      firebaseId: data.id,
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ").slice(1).join(" "),
      email: data.email,
      phone: "12345678",
      role: data.role,
      password: data.password,
      cellId: data.familyGroup.id,
    };
  }
}
