import { AuthUserRequest } from "../dtos/request/AuthUserRequest";
import { AuthUserService } from "../dtos/response/AuthUserResponse";

export interface IAuthUserService {
    login(user: AuthUserRequest): Promise<AuthUserService | null>
    signUp(user: AuthUserRequest): Promise<AuthUserService | null>
}