import { Response } from "../../../Config/Response";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamilyGroupRepository";

export class GetByIdUseCase {
    constructor(private readonly repository: FamilyGroupRepository) { }

    async execute(id: string): Promise<Response<FamilyGroup | null>> {
        const response = await this.repository.getById(id);
        if (!response) {
            return new Response(false, "No se encontro Grupo Familiar con el id ingresado", null)
        }

        return new Response(true, "success operation", response);
    }
}