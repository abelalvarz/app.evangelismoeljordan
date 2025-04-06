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