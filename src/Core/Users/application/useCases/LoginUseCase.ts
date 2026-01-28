import { Response } from "../../../Config/Response";
import { UserRepository } from "../../domain/repository/UserRepository";
import { AuthUserRequest } from "../dtos/request/AuthUserRequest";
import { AuthenticationResponse } from "../dtos/response/AuthenticationResponse";
import { IAuthUserService } from "../interface/IAuthUserService";

export class LoginUseCase {
    constructor(
        private readonly repository: UserRepository,
        private readonly authService: IAuthUserService
    ) { }

    async execute(request: AuthUserRequest): Promise<Response<AuthenticationResponse | null>> {

        const loggedUser = await this.authService.login(request);
        console.log("Logged User from Auth Service:", loggedUser);

        if (loggedUser == null)
            return new Response(false, "Email o Contraseña incorrectos.", null)

        console.log("validating user with eamil");
        const user = await this.repository.findByEmail(loggedUser.email);
        if (!user)
            return new Response(false, "Usuario invalido", null)

        console.log("checking user status");
        if(user.status === 'INACTIVE')
            return new Response(false, "El usuario está inactivo", null)

        console.log("creating response");
        return new Response(true, "Inicio de Sesión Exitoso", new AuthenticationResponse(
            loggedUser.token,
            user.name,
            user.email,
            user.role,
            user.familyGroup
        ))
    }
}