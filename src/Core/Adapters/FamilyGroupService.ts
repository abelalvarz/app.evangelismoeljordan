import { CreateUseCase } from "../FamilyGroups/application/useCases/createUseCase";
import { DeleteUseCase } from "../FamilyGroups/application/useCases/deleteUseCase";
import { GetAllUseCase } from "../FamilyGroups/application/useCases/getAllUseCase";
import { GetByIdUseCase } from "../FamilyGroups/application/useCases/getByIdUseCase";
import { FirebaseFamilyGroupRepository } from "../FamilyGroups/infrastructure/firebase/FirebaseFamilyGroupRepository";

const repository = new FirebaseFamilyGroupRepository();

export const FamilyGroupService = {
    create: new CreateUseCase(repository),
    getAll: new GetAllUseCase(repository),
    getById: new GetByIdUseCase(repository),
    update: new GetByIdUseCase(repository),
    delete: new DeleteUseCase(repository)
}