import { User } from "../model/User";

export interface UserRepository {
    create(user: User): Promise<boolean>
    getById(id: string): Promise<User | null>
    getByRoleAndFamilyGroup(role: string, familyGroup: string): Promise<User | null>
}