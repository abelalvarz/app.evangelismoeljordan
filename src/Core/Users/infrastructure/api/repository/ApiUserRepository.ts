import { deleteUser } from "firebase/auth";
import { UserRepository } from "../../../domain/repository/UserRepository";
import axios from "axios";
import { firebaseAuth } from "../../../../Config/FirebaseConfiguration";
import { RoutesConfig } from "../../environment/routes.config";
import { CreateUserRequest, User } from "../../../domain/model/User";
import { UserMapper } from "../mapper/UserMapper";

const auth = firebaseAuth;
export class ApiUserRepository implements UserRepository {

    async getUserProfile(token: string): Promise<User | null> {

        const response = await axios.get(`${RoutesConfig.BASE_API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        }});

        const userData = response.data;
        console.log("User data fetched from API:", userData);

        if (!userData) {
            console.log("No user found with token");
            return Promise.resolve(null);
        }

        const user = UserMapper.toDomain(userData);
        console.log("User object gotten:", user);

        return Promise.resolve(user);
    }

    async create(user: CreateUserRequest): Promise<boolean> {
        try {

            const createUserRequest = UserMapper.toCreateUserRequest(user)
            const response = await axios.post(`${RoutesConfig.AUTH_API_URL}/register`, createUserRequest)

            console.log(response.data);

            return Promise.resolve(true);
        } catch (error: unknown) {
            console.log("Error message:", error instanceof Error ? error.message : 'Unknown error occurred');
            await deleteUser(auth.currentUser!);
            return false;
        }
    }

    // @Deprecated
    getById(id: string): Promise<User | null> {
        throw new Error("Method not implemented." + id);
    }

    // @Deprecated
    getByRoleAndFamilyGroup(role: string, familyGroup: string): Promise<User | null> {
        console.log("Method not implemented.", role, familyGroup);
        return Promise.resolve(null);
    }
}