import { Response } from "../../../Config/Response";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamilyGroupRepository";
import { FamilyGroupRequest } from "../dtos/FamilyGroupRequest";

export class UpdateUseCase {
    constructor(private readonly repository: FamilyGroupRepository) { }

    async execute(request: FamilyGroupRequest): Promise<Response<boolean | null>> {

        if (!request.id)
            return new Response(false, "El id no es valid", null)

        const response = await this.repository.update(new FamilyGroup(
            request.id,
            request.name,
            request.color,
            request.teacher,
            request.anfitrion,
            request.leaders,
            request.meetingTime,
            request.meetingDay
        ))
        
        if (!response)
            return Promise.reject("No se pudo realizar la Actualizacion")

        return new Response(true, "success operation", response);
    }
}