import { Response } from "../../../Config/Response";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamilyGroupRepository";

export class GetAllUseCase {
    constructor(private readonly repository: FamilyGroupRepository) { }

    async execute(): Promise<Response<FamilyGroup[]>> {
        const response = await this.repository.getAll()
        return new Response(true, "success operation", response)
    }
}