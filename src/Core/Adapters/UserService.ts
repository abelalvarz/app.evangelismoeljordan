import { CreateUseCase } from "../Users/application/useCases/CreateUseCase";
import { LoginUseCase } from "../Users/application/useCases/LoginUseCase";
import { FirebaseAuthService } from "../Users/infrastructure/firebase/FirebaseAuthService";
import { FirebaseUserRepository } from "../Users/infrastructure/firebase/FirebaseUserRepository";

const userRepository = new FirebaseUserRepository();
const authRepository = new FirebaseAuthService();

export const UserService = {
    create: new CreateUseCase(userRepository,authRepository),
    login: new LoginUseCase(userRepository, authRepository) 
}