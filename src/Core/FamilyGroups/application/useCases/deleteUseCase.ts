import { Response } from "../../../Config/Response";
import { FamilyGroupRepository } from "../../domain/repository/FamilyGroupRepository";


export class DeleteUseCase{
    constructor(private readonly repository: FamilyGroupRepository){}

    async execute(id: string):Promise<Response<boolean|null>>{
        const response = await this.repository.delete(id);

        if(!response)
            return Promise.reject("No se pudo eliminar el grupo, intente mas tarde")

        return new Response(true,"success operation",null)
    }
}