import { CreateUseCase } from "../Users/application/useCases/CreateUseCase";
import { LoginUseCase } from "../Users/application/useCases/LoginUseCase";
import { ApiUserRepository } from "../Users/infrastructure/api/ApiUserRepository";
import { FirebaseAuthService } from "../Users/infrastructure/firebase/FirebaseAuthService";

const apiUserRepository = new ApiUserRepository();
const authRepository = new FirebaseAuthService();

export const UserService = {
    create: new CreateUseCase(apiUserRepository,authRepository),
    login: new LoginUseCase(apiUserRepository, authRepository) 
}