import { Response } from "../../../Config/Response";
import { CreateUserRequest } from "../../domain/model/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { UserRequest } from "../dtos/request/UserRequest";
import { IAuthUserService } from "../interface/IAuthUserService";

export class CreateUseCase {
    constructor(
        private readonly repository: UserRepository,
        private readonly authService: IAuthUserService
    ) { }

    async execute(request: UserRequest): Promise<Response<unknown>> {


        if (!request.familyGroup)
            return new Response(false, "No encontro el grupo familiar", null)

        const createdCredential = await this.authService.signUp({
            email: request.email, 
            password: request.password,
            keepLogged: false
        })
        
        if (!createdCredential?.id)
            return new Response(false, "El email ingresado ya existe", null)

        
        const user = new CreateUserRequest(
            createdCredential.id,
            request.name,
            request.email,
            request.familyGroup,
            request.role,
            'ACTIVE',
            request.password
        )

        const createdUser = await this.repository.create(user);

        if (!createdUser.success)
            return new Response(false, createdUser.message, null)

        return new Response(true, "Usuario Creado Exitosamente", null)
    }
}