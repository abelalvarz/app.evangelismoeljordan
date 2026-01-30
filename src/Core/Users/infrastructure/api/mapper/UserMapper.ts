import { User } from "../../../domain/model/User";

export class UserMapper {
    static toDomain(apiUserData: any): User {
        return new User(
            apiUserData.id,
            apiUserData.name,
            apiUserData.email,
            apiUserData.cell,
            apiUserData.roles,
            apiUserData.status
        );
    }
    static toCreateUserRequest(data: any): any {
        return {
            id: data.id,
            firstName: data.name.split(' ')[0],
            lastName: data.name.split(' ').slice(1).join(' '),
            email: data.email,
            phone: "12345678",
            roles: data.role,
            password: data.password,
            cellId: data.familyGroup.id
        };
    }
}