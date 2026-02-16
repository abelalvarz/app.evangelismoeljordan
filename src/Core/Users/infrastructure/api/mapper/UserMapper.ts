import { User } from "../../../domain/model/User";

export class UserMapper {
  static toDomain(apiUserData: any): User {
    const familyGroup = {
      id: apiUserData.cell.id,
      name: apiUserData.cell.name,
      color: apiUserData.cell?.color || '',
      teacher: apiUserData.cell?.teacher,
      anfitrion: apiUserData.cell?.anfitrion,
      leaders: apiUserData.cell?.leaders,
      meetingDay: apiUserData.cell?.meetingDay,
      meetingTime: apiUserData.cell?.meetingTime,
    };
    return {
      id: apiUserData.id,
      name: apiUserData.name,
      email: apiUserData.email,
      familyGroup: familyGroup,
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
