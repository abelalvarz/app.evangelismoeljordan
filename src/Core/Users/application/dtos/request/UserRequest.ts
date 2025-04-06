import { FamilyGroup } from "../../types/FamilyGroup";

export interface UserRequest {
    name: string;
    email: string;
    password: string;
    familyGroup: FamilyGroup | null,
    role: string
}