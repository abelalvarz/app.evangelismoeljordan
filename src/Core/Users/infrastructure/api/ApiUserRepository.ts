import { deleteUser } from "firebase/auth";
import { UserRepository } from "../../domain/repository/UserRepository";
import axios from "axios";
import { firebaseAuth } from "../../../Config/FirebaseConfiguration";
import { RoutesConfig } from "../environment/routes.config";
import { User } from "../../domain/model/User";

const auth = firebaseAuth;
export class ApiUserRepository implements UserRepository {

    async findByEmail(email: string): Promise<User | null> {
        const response = await axios.get(`${RoutesConfig.AUTH_API_URL}/valid/${email}`);
        const userData = response.data;
        console.log("User data fetched from API:", userData);

        if (!userData) {
            console.log("No user found with email:", email);
            return Promise.resolve(null);
        }

        const user = new User(
            null,
            userData.firstName + ' ' + userData.lastName,
            userData.email,
            userData?.familyGroup,
            userData?.roles,
            userData?.status);

        console.log("User object created:", user);
        return Promise.resolve(user);
    }

    async create(user: User): Promise<boolean> {
        try {

            const roles = []
            roles.push(user.role)

            const response = await axios.post(`${RoutesConfig.AUTH_API_URL}/register`, {
                id: user.id,
                firstName: user.name.split(' ')[0],
                lastName: user.name.split(' ').slice(1).join(' '),
                email: user.email,
                phone: "12345678",
                roles: user.role,
                cellId: '2a832c53-bfb0-4a5d-a401-c79f0cedf859'
            })
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