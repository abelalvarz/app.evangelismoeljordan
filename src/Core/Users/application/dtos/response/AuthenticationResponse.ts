import { FamilyGroup } from "../../types/FamilyGroup";

export class AuthenticationResponse {
    constructor(
        readonly token: string,
        readonly name: string,
        readonly email: string,
        readonly rol: string,
        readonly familyGroup: FamilyGroup,
    ) { }
}