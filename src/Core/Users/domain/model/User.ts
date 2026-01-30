export type UserStatus = 'ACTIVE' | 'INACTIVE'

type FamilyGroup = {
    id: string
    name: string,
    color: string,
    teacher: string,
    anfitrion: string,
    leaders: string[],
    meetingDay: string,
    meetingTime: string
}

export class User {
    constructor(
        readonly id: string | null,
        readonly name: string,
        readonly email: string,
        readonly familyGroup: FamilyGroup,
        readonly role: string[],
        readonly status: UserStatus
    ){}
}
export class CreateUserRequest extends User {
    password: string;
    constructor(
        id: string | null,
        name: string,
        email: string,
        familyGroup: FamilyGroup,
        role: string[],
        status: UserStatus,
        password: string
    ) {
        super(id, name, email, familyGroup, role, status);
        this.password = password;
    }   
}