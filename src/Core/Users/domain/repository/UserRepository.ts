import { CreateUserRequest, User } from "../model/User";

export interface UserRepository {
    create(user: CreateUserRequest): Promise<{success:boolean, message: string}>
    getUserProfile(token: string): Promise<User | null>
}