import { deleteUser } from "firebase/auth";
import { UserRepository } from "../../../domain/repository/UserRepository";
import axios from "axios";
import { firebaseAuth } from "../../../../Config/FirebaseConfiguration";
import { RoutesConfig } from "../../environment/routes.config";
import { CreateUserRequest, User } from "../../../domain/model/User";
import { UserMapper } from "../mapper/UserMapper";
import { UseMessages } from "../mapper/UserMessageMapper";

const auth = firebaseAuth;
export class ApiUserRepository implements UserRepository {
  async getUserProfile(token: string): Promise<User | null> {
    const response = await axios.get(`${RoutesConfig.BASE_API_URL}/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = response.data;
    console.log("User data fetched from API:", userData);

    if (!userData) {
      console.log("No user found with token");
      return Promise.resolve(null);
    }

    console.log("User Data: ", userData.data);
    const user = UserMapper.toDomain(userData.data);
    console.log("User object gotten:", user);

    return Promise.resolve(user);
  }

  async create(
    user: CreateUserRequest,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const createUserRequest = UserMapper.toCreateUserRequest(user);
      const response = await axios.post(
        `${RoutesConfig.AUTH_API_URL}/register`,
        createUserRequest,
      );

      console.log(response.data);

      return { 
        success: true, 
        message: UseMessages["CREATED_USER"] 
    };
    } catch (error: unknown) {
      console.log(
        "Error message:",
        error instanceof Error ? error.message : "Unknown error occurred",
      );
      await deleteUser(auth.currentUser!);
      return {
        success: false,
        message: UseMessages["CELL_ROLE_EXISTS"],
      };
    }
  }
}
