import { Response } from "../../../Config/Response";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamilyGroupRepository";
import { FamilyGroupRequest } from "../dtos/FamilyGroupRequest";

export class CreateUseCase {
    constructor(private readonly repository: FamilyGroupRepository) { }

    async execute(group: FamilyGroupRequest): Promise<Response<boolean | null>> {

        if (!group) {
            return new Response(false, "No se recibieron datos validos", null)
        }

        const familyGroup = new FamilyGroup(
            null,
            group.name,
            group.color,
            group.teacher,
            group.anfitrion,
            group.leaders,
            group.meetingTime,
            group.meetingDay
        )

        const response = await this.repository.create(familyGroup);

        if (!response) {
            return new Response(false, "Hubo un error al guardar el grupo Familiar", null)
        }

        return new Response(true, "success operation", response);
    }
}