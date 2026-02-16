import { GetAllUseCase } from "../FamilyGroups/application/useCases/getAllUseCase";
import { ApiFamilyGroupRepository } from "../FamilyGroups/infrastructure/api/ApiFamilyGroupRepository";

const apiFamilyGroupRepository = new ApiFamilyGroupRepository();

export const FamilyGroupService = {
    getAll: new GetAllUseCase(apiFamilyGroupRepository),
}