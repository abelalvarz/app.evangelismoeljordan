import { FamilyGroup } from "../model/FamilyGroup";

export interface FamilyGroupRepository {
    create(familyGroup: FamilyGroup): Promise<boolean>
    getAll(): Promise<FamilyGroup[]>
    getById(id: string): Promise<FamilyGroup | null>
    update(familyGroup: FamilyGroup): Promise<boolean>
    delete(id: string): Promise<boolean>
}