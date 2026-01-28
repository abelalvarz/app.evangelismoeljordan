import { CreateUseCase } from "../FamilyGroups/application/useCases/createUseCase";
import { DeleteUseCase } from "../FamilyGroups/application/useCases/deleteUseCase";
import { GetAllUseCase } from "../FamilyGroups/application/useCases/getAllUseCase";
import { GetByIdUseCase } from "../FamilyGroups/application/useCases/getByIdUseCase";
import { ApiFamilyGroupRepository } from "../FamilyGroups/infrastructure/api/ApiFamilyGroupRepository";
import { FirebaseFamilyGroupRepository } from "../FamilyGroups/infrastructure/firebase/FirebaseFamilyGroupRepository";

const repository = new FirebaseFamilyGroupRepository();
const apiFamilyGroupRepository = new ApiFamilyGroupRepository();

export const FamilyGroupService = {
    create: new CreateUseCase(repository),
    getAll: new GetAllUseCase(apiFamilyGroupRepository),
    getById: new GetByIdUseCase(apiFamilyGroupRepository),
    update: new GetByIdUseCase(repository),
    delete: new DeleteUseCase(repository)
}