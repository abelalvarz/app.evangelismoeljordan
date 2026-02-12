import { CreateUserRequest, User } from "../model/User";

export interface UserRepository {
    create(user: CreateUserRequest): Promise<boolean>
    getUserProfile(token: string): Promise<User | null>
}