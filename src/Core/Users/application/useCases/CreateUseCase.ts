import { Response } from "../../../Config/Response";
import { User } from "../../domain/model/User";
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

        const alreadyExistRol = await this.repository.getByRolAndFamilyGroup(request.rol, request.familyGroup?.name);
        if (alreadyExistRol)
            return new Response(false, "El grupo ya tiene el cargo seleccionado asignado", null)

        const createdCredential = await this.authService.signUp({ email: request.email, password: request.password })
        if (!createdCredential?.id)
            return new Response(false, "El email ingresado ya existe", null)


        const user = new User(
            createdCredential.id,
            request.name,
            request.email,
            request.familyGroup,
            request.rol,
            'ACTIVE'
        )

        const createdUser = await this.repository.create(user);

        if (!createdUser)
            return new Response(false, "El usuario no se pudo crear", null)

        return new Response(true, "Usuario Creado Exitosamente", null)
    }
}